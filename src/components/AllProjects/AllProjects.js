import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./AllProjects.module.css";
import Project from '../Project/Project';
import * as allProjectsActions from '../../store/actions/allProjects';

class AllProjects extends Component {
  componentDidMount() {
    this.props.onInitAllProjects();
  }

  render() {
    return (
      <div className={styles.Background}>
        <div className={styles.Content}>
          <div className={styles.AllProjects}>
            <h1 className={styles.Title}>All Projects</h1>
            <section className={styles.Wrap}>
              {this.props.allProjects.map((project) => {
                return <Project key={project.title} title={project.title} description={project.description} img={project.imgs[0]} projectInfo={project} />
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
    error: state.allProjectsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitAllProjects: () => dispatch(allProjectsActions.initAllProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(AllProjects);
