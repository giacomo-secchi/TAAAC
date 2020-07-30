import React, { Component } from 'react';
 
class Project extends Component {
  constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            project: []
        };

        // this.submitProject = this.submitProject.bind(this);
    }

    async componentDidMount() {
        await this.refreshProject();
    }

    async refreshProject() {
        const { match: { params } } = this.props;
        await fetch(`/api/projects/${params.projectId}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    project: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    // async submitProject(answer) {
    //     await axios.post(`http://localhost:8081/answer/${this.state.question.id}`, {
    //       answer,
    //     }, {
    //       headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    //     });
    //     await this.refreshQuestion();
    // }
    

  render() {
    const { error, isLoaded, project } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        // TODO: https://github.com/auth0-blog/react-tutorial/blob/master/qa-react/src/Question/Question.js
        <ul>
          {project.title}
     
        </ul>
      );
    }
  }
}

export default Project;