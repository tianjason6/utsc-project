import React, { Component } from 'react';

import styles from './JoinedProjects.module.css';

import { connect } from 'react-redux';

//reducers and actions
import userJoinedProjectsReducer from '../../store/reducers/joinedProjects';
import authReducer from '../../store/reducers/auth';

import * as userJoinedProjectsAction from '../../store/actions/joinedProjects';

import ProjectsOverview from '../ProjectsOverview/ProjectsOverview';
import Project from '../Project/Project';


class JoinedProjects extends Component {
    componentDidMount(){
        this.props.fetchJoinedProjects(this.props.userEmail.split('@')[0]);
    }
    render(){
        console.log('jlee projects test:',this.props.userJoinedProjects)
        const userJoinedProjects = this.props.userJoinedProjects.map( project => {
            return(
                <Project key={project.title}
                title={project.title}
                description={project.description}
                img={project.imgs[0]}
                projectInfo={project} />
            );
        });
        return(
            <div className={styles.Content}>
                <div className={styles.Background}>
                    <div className={styles.OngoingProjects}>
                        <h1>Joined Projects</h1>
                        <section className={styles.Wrap}>
                            {userJoinedProjects}
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
        userEmail: state.authReducer.email
    };
}
//running the function
const mapDispatchToProps = dispatch => {
    return {
        fetchJoinedProjects: (userName) => dispatch(userJoinedProjectsAction.initJoinedProjects(userName))
    }
}

//jlee whats the null and pure crap?
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(JoinedProjects);