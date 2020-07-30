import React, { Component } from 'react';
import { 
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Auth from './Auth/Auth.js';
import Callback from './Callback/Callback';
import Projects from './Projects/Projects';
import Project from './Project/Project';
import NewProject from './NewProject/NewProject';

import { ROUTES_CONFIG } from './constants-variables';




const auth = new Auth();



const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

const Dashboard = () => (
    <Projects />
);

const About = () => (
  <div>
    <h2>About page</h2>
  </div>
);


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
      if(auth.isAuthenticated()) {
        return <Component {...props} />
      }else{
        return <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }}
         />
      }
    }}
  />
);

const CustomLink = ({ children, to, exact }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    <div className={match ? 'active' : ''}>
      {match ? '> ' : ''}
      <Link to={to}>
        {children}
      </Link>
    </div>
  )}/>
);

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}



class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

        </header>
        <button onClick={this.goTo.bind(this, ROUTES_CONFIG.adminHome)} >Home</button>
        {
          !isAuthenticated() && (<button onClick={this.login.bind(this)} >Log In</button>)
        }
        {
          isAuthenticated() && (<button onClick={this.logout.bind(this)}>Log Out</button>)
        }
 
        <nav>
          <ul>
            <li><CustomLink exact={true} to="/">Home</CustomLink></li>
            <li><CustomLink to="/login">Login</CustomLink></li>
            <li><CustomLink to="/about">about</CustomLink></li>
            <li><CustomLink to="/test">test</CustomLink></li>
            <li><CustomLink to={ROUTES_CONFIG.adminHome}>Dashboard</CustomLink></li>
          </ul>
        </nav>

          <Route path="/" exact component={Home}/>
          <Route path='/project/:projectId' component={Project}/>
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/test" render={() => (<div> This is the test route </div>)}/>
          <Route path="/callback" render={(props) => { handleAuthentication(props); return <Callback {...props} /> }}/>

          <PrivateRoute path="/new-project" component={NewProject} />
          <PrivateRoute path="/dashboard" component={Dashboard} /> 
      </div>
    );
  }
}

export default App;
