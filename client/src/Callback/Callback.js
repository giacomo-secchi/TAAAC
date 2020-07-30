// src/Callback/Callback.js

import React, { Component } from 'react';
import loading from './loading.svg';

class Callback extends Component {
  render() {
    const style = {backgroundColor: '#eee'};

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;