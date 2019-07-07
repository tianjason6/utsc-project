import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProjectAdd.module.css';
import * as projectActions from '../../store/actions/project';

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
            <h2>Create a New Project</h2>

            <input type="text" name="title" placeholder="Project Name"></input>
            <input type="file" name="image" accept="image/*"></input>
          </div>
          <textarea type="text" name="description" placeholder="Enter project description"></textarea>

          <button>Add Project</button>
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