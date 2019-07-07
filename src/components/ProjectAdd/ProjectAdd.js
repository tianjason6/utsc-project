import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProjectAdd.module.css';
import * as projectActions from '../../store/actions/project';
import AddProject1Img from '../../assests/images/addProject.svg';

class ProjectAdd extends Component {

  constructor(props) {
    super(props);
    this.params = new URLSearchParams(this.props.location.search);

  };

  render() {
    return (
      <div className={styles.Content}>
        <form action="">
          <div className={styles.TitleImgs}>
            <input type="text" name="title" placeholder="Project Name"></input>
            <img src={AddProject1Img}></img>
            <input type="file" name="image" accept="image/*"></input>
            <h1>Description</h1>
            <textarea className={styles.Description} type="text" name="description" placeholder="Enter project description"></textarea>
            <button>Add Project</button>
          </div>
        </form>
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