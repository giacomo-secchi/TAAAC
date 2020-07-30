import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import { ROUTES_CONFIG } from './constants-variables';
import history from '../history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace(`/${ROUTES_CONFIG.adminHome}`);
      } else if (err) {
        history.replace(`/${ROUTES_CONFIG.adminHome}`);
        console.log(err);
      }
    });
  }
  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace(`/${ROUTES_CONFIG.adminHome}`);
  }
  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace(`/${ROUTES_CONFIG.adminHome}`);
  }
  login() {
    this.auth0.authorize();
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

// TODO: https://auth0.com/docs/quickstart/spa/react
// TODO: https://github.com/auth0-blog/react-tutorial/blob/master/frontend/src/Auth.js
// TODO: https://github.com/auth0-samples/auth0-react-samples/blob/master/01-Login/src/Auth/Auth.js
// TODO: https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/