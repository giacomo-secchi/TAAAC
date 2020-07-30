'use strict';

import React, { Component } from 'react';
import logo from './logo.svg';


class Brand extends Component {
    render() {
        return(
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Login to Coming Sun</h1>
		  	</header>
        );
    }
}

export default Brand;
