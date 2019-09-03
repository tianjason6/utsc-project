import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './MyProjectsOverview.module.css';
import Project from '../Project/Project';
import Project1Img from '../../assests/images/tempLogo.png';
import AddProject1Img from '../../assests/images/addProject.svg';
import * as featuredProjectsActions from '../../store/actions/featuredProjects';



import * as userManagedProjectsActions from '../../store/actions/userManagedProjects';
import * as authReducer from '../../store/reducers/auth';
import * as userManagedProjectsReducer from '../../store/reducers/userManagedProjects';

class MyProjectsOverview extends Component {

  componentDidMount() {
    this.props.onInitUserManagedProjects(this.props.authEmail.split('@')[0]);
  }

  render() {
    console.log('user managed projects: ');
    console.log(this.props.userManagedProjects);
    const managedProjects = this.props.userManagedProjects.map(project => {
      return (
        <Project key={project.title}
        title={project.title}
        description={project.description}
        img={project.imgs[0]}
        projectInfo={project} />
      )});
    return (
      <div className={styles.Background} >
        <div className={styles.OngoingProjects}>
          <h1>My Projects</h1>
          <section className={styles.Wrap}>
            {managedProjects}
          </section>
        </div>
      </div>


    )
  }
}

const mapStateToProps = state => {
  return {
    authEmail: state.authReducer.email,
    featuredProjects: state.featuredProjectsReducer.projects,
    error: state.featuredProjectsReducer.error,
    userManagedProjects: state.userManagedProjectsReducer.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFeaturedProjects: () => dispatch(featuredProjectsActions.initFeaturedProjects()),
    onInitUserManagedProjects: (username) => dispatch(userManagedProjectsActions.initUserManagedProjects(username)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(MyProjectsOverview);