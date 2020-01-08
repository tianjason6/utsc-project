import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ManagedProjectsOverview.module.css";
import Project from "../Project/Project";
import * as userManagedProjectsActions from "../../store/actions/userManagedProjects";
import RouteError from "../RouteError/RouteError";
import history from "../../history";

class ManagedProjectsOverview extends Component {
  componentDidMount() {
    this.props.onInitUserManagedProjects(this.props.authEmail.split("@")[0]);
  }

  render() {
    let managedProjects;
    if (this.props.userManagedProjects.length !== 0) {
      managedProjects = this.props.userManagedProjects.map(project => {
        if (project === null) {
          return null;
        }
        return (
          <>
            <button onClick={history.push("/test/ProjectAdd")}></button>
            <Project
              key={project.title}
              title={project.title}
              description={project.description}
              img={project.imgs[0]}
              projectInfo={project}
            />
          </>
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
