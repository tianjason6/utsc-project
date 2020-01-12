import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./AllProjects.module.css";
import axios from "../../axios-projects";
import Project from '../Project/Project';
import * as archiveStatus from "../../store/actions/archiveStatus";
import * as allProjectsActions from '../../store/actions/allProjects';

class AllProjects extends Component {
  componentDidMount() {
    this.props.onInitAllProjects();
    this.props.setArchiveStatus(this.props.allProjects);
  }

  render() {
    console.log("AllProjects archive status", this.props.isArchived)
    return (
      <div className={styles.Background}>
        <div className={styles.Content}>
          <div className={styles.AllProjects}>
            <h1 className={styles.Title}>All Projects</h1>
            <section className={styles.Wrap}>
              {this.props.allProjects.map((project) => {
                return <Project key={project.data.title} title={project.data.title} description={project.data.description} img={project.data.imgs[0]} projectInfo={project.data} />
              })}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProjects: state.allProjectsReducer.projects,
    error: state.allProjectsReducer.error,
    isArchived: state.archiveStatusReducer.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitAllProjects: () => dispatch(allProjectsActions.initAllProjects()),
    setArchiveStatus: (projects) => dispatch(archiveStatus.setArchiveStatus(projects))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(AllProjects);
