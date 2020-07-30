'use strict';

import React, { Component } from 'react';
import { connect } from "react-redux";
import { addProject } from "../redux/actions";

class AddProject extends Component {
    
    handleAddProject() {
        alert('dddd')
    };


    render() {
        return (
          <div>
            <input
              onChange={e => this.updateInput(e.target.value)}
              value={this.state.input}
            />
            <button className="add-todo" onClick={this.handleAddProject}>
              Add Todo
            </button>
          </div>
        );
    }
}

export default connect(
  null,
  { addProject }
)(AddProject);