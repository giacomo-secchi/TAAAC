'use strict';

import React from 'react';

  
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
 
        };
 
    }
    
 

    render() {

 
        return (
			 <div>
                 <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" onChange={event => this.handleChange(event)} value={this.state.username} autoComplete="username" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={event =>  this.handleChange(event)} value={this.state.password} autoComplete="new-password" />
                    </label>
                    <button type="submit" value="Submit">Register</button>
                </form>     
            </div>
        );
    }
}

export default Login;
