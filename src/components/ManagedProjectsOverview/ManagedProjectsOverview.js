import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ManagedProjectsOverview.module.css";
import Project from "../Project/Project";
import Project1Img from "../../assests/images/tempLogo.png";
import AddProject1Img from "../../assests/images/addProject.svg";
import * as featuredProjectsActions from "../../store/actions/featuredProjects";

import * as userManagedProjectsActions from "../../store/actions/userManagedProjects";
import * as authReducer from "../../store/reducers/auth";
import * as userManagedProjectsReducer from "../../store/reducers/userManagedProjects";

class ManagedProjectsOverview extends Component {
  componentDidMount() {
    this.props.onInitUserManagedProjects(this.props.authEmail.split("@")[0]);
  }

  render() {
    let managedProjects;
    // need to get rid of console logs
    // saved on database with null projects?
    if (this.props.userManagedProjects.length !== 0) {
      console.log(
        this.props.userManagedProjects.length,
        "length of managed projects"
      );
      managedProjects = this.props.userManagedProjects.map(project => {
        console.log(project, "project variable in managed Projects");
        if (project === null) {
          return undefined;
        }
        return (
          <Project
            key={project.title}
            title={project.title}
            description={project.description}
            img={project.imgs[0]}
            projectInfo={project}
          />
        );
      });
    }

    return (
      <div className={styles.Background}>
        <div className={styles.OngoingProjects}>
          <h1>Managed Projects</h1>
          {managedProjects === undefined ? (
            <h1>You aren't managing any projects right now!</h1>
          ) : (
            <section className={styles.Wrap}>{managedProjects}</section>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authEmail: state.authReducer.email,
    error: state.featuredProjectsReducer.error,
    userManagedProjects: state.userManagedProjectsReducer.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitUserManagedProjects: username =>
      dispatch(userManagedProjectsActions.initUserManagedProjects(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(ManagedProjectsOverview);
