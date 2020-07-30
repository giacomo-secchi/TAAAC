import jwt_decode from 'jwt-decode';
import auth0 from 'auth0-js';

class Auth {
    constructor() {
     }
    setToken(token) {
        localStorage.setItem('token', token)
    }
    getToken() {
        return localStorage.getItem('token');
    }
    signout() {
        localStorage.removeItem('token');
    }
    authenticate() {}
    isAuthenticated() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token) {
        var decoded = jwt_decode(token);
        try {
            return decoded.exp < ( Date.now() / 1000 )
        }catch (err) {
            return false;
        }
        
    }
}

export default Auth;