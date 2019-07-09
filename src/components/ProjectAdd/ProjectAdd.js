import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProjectAdd.module.css';
import * as projectActions from '../../store/actions/project';
import AddProject1Img from '../../assests/images/addProject.svg';

class ProjectAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      title: this.state.title,
      description: this.state.body
    }
    console.log("Project Title: " + project.title);
    console.log("Project Description: " + project.description);

  }

  render() {
    return (
      <div className={styles.Content}>
        <div className={styles.TitleImgs}>
          <input type="text" name="title" placeholder="Project Name" onChange={this.onChange} value={this.state.title}></input>
          <img src={AddProject1Img}></img>
          <input type="file" name="image" accept="image/*"></input>
        </div>
        <h1>Description</h1>
        <textarea className={styles.Description} type="text" name="description" placeholder="Enter project description" onChange={this.onChange} value={this.state.description}></textarea>
        <button className={styles.ViewProject} onClick={this.onSubmit}>Add Project</button>
      </div>
    )


  }
}

const mapStateToProps = state => {
  return {
    project: state.projectReducer.project,
    error: state.projectsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitProject: (projectTitle) => dispatch(projectActions.initProject(projectTitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);