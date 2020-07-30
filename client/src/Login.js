'use strict';

import React from 'react';
import Auth from './Auth/Auth.js';


  
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            redirectToPreviousRoute: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);

        this.Auth = new Auth();
        // const auth = new Auth();

    }
    
    login() {
        Auth.authenticate(() => {
            this.setState({ redirectToPreviousRoute: true });
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    componentDidMount(){
        if(!this.Auth.isAuthenticated()) this.props.history.replace('/login');
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const url = 'http://127.0.0.1:3000/api/login';

        let data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
  
        let request = new Request(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: { 'Content-type': 'application/json' }
        });


        fetch(request)
        .then(response => response.json())
        .then(response => this.Auth.setToken(response.token))
        .catch(error => console.error('Error:', error));


    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToPreviousRoute } = this.state;
    
        if (redirectToPreviousRoute) {
          return <Redirect to={from} />;
        }

        return (
			 <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" onChange={event => this.handleChange(event)} value={this.state.username} autoComplete="username" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={event =>  this.handleChange(event)} value={this.state.password} autoComplete="current-password" />
                    </label>
                    <button type="submit" value="Submit">Log in</button>
                </form>
                 
            </div>
        );
    }
}

export default Login;
