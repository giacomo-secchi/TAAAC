import React, { Component } from 'react';
 
class NewProject extends Component {
  constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            title: '',
            // description: '', 
        };
     }

     updateDescription(value) {
        this.setState({
          description: value,
        });
      }
    
      updateTitle(value) {
        this.setState({
          title: value,
        });
      }
    
      async submit() {
        this.setState({
          disabled: true,
        });
    
        await fetch('/api/projects', {
            method: "POST",
            title: this.state.title,
        //   description: this.state.description,
            headers: {
                'Authorization': `Bearer ${auth0Client.getIdToken()}`  
            }
        });
    
        // this.props.history.push('/');

        // TODO: https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
      }
    
 
    

  render() {
    return(
        <form>
            <h2>New Project</h2>   

            <label>
                Title:
                <input disabled={this.state.disabled} type="text" onBlur={(e) => {this.updateTitle(e.target.value)}} placeholder="Give your question a title." />
            </label>
            <br />
            <label>
                Description:
                <input disabled={this.state.disabled} type="text" onBlur={(e) => {this.updateDescription(e.target.value)}} placeholder="Give more context to your question." />
            </label>

            <button disabled={this.state.disabled} onClick={() => {this.submit()}}>Submit</button>
        </form>
    )

     }
}

export default NewProject;