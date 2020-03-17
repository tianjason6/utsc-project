import React, { Component } from 'react';

import styles from './JoinedProjects.module.css';

import { connect } from 'react-redux';

import * as userJoinedProjectsAction from '../../store/actions/joinedProjects';

import Project from '../Project/Project';


class JoinedProjects extends Component {
    componentDidMount(){
        if (this.props.loggedInUser) {
            this.props.fetchJoinedProjects(this.props.loggedInUser.projectsJoined);
            this.props.fetchJoinedProjects(this.props.userJoinedProjects);
        }
    }

    render(){
        let joinedProjects = <h1 className={styles.emptyMsg}>You haven't joined any projects! Go join some!</h1>;
        
        if (this.props.userJoinedProjects.length !== 0) {
            joinedProjects = this.props.userJoinedProjects.map(project => {
              if (project === null) {
                return null;
              }
              return (
                <>
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
        
        
        return(
            <div className={styles.Content}>
                <div className={styles.Background}>
                    <div className={styles.OngoingProjects}>
                        <h1>Joined Projects</h1>
                        <section className={styles.Wrap}>
                            {joinedProjects}
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}


//getting the store
const mapStateToProps = state =>{
    return{
        userJoinedProjects: state.userJoinedProjectsReducer.projects,
        userEmail: state.authReducer.email,
        loggedInUser: state.loggedInUserReducer.loggedInUser
    };
}
//running the function
const mapDispatchToProps = dispatch => {
    return {
        fetchJoinedProjects: (userName) => dispatch(userJoinedProjectsAction.initJoinedProjects(userName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(JoinedProjects);