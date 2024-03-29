import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Router } from 'react-router-dom';
import Auth from './Auth/Auth.js';
import history from './history';

// import '@babel/polyfill';
// import 'whatwg-fetch';

const auth = new Auth();


ReactDOM.render(
    <Router history={history}>
        <App auth={auth} history={history} />
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();