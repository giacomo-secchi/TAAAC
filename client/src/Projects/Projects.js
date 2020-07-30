import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
        error: null,
        isLoaded: false,
        projects: []
    };
  }

    componentDidMount() {
    fetch("/api/projects")
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
                isLoaded: true,
                projects: result
            });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    )
  }

  render() {
    const { error, isLoaded, projects } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {projects.map(project => (
            <li key={project.title}>
              <Link to={`/project/${project._id}`}>
                {project.title} {project.price}
              </Link>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Projects;