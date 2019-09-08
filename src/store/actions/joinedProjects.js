import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const setUserJoinedProjects = (projects) =>{
    return{
        type: actionTypes.SET_USER_JOINED_PROJECTS,
        projects: projects
    }
}

export const initJoinedProjects = (username) => {
    //get user
    return(dispatch) => {
        axios.get('Users/' + username + '.json')
        .then(res => {
            let projectsJoinedTitles = res.data.projectsJoined;
            let projectsJoined = projectsJoinedTitles.map( projectTitle =>{
                return axios.get('Projects/' + projectTitle + '.json');
            });
            //wait until i get all of the project data of the projects this user joined
            Promise.all(projectsJoined)
                .then(res =>{
                    //we only want the data, so map only the data to a new array
                    const projectsJoined = res.map(project => project.data ); 
                    console.log('jlee projects joined');
                    console.log('projects joined: ', projectsJoined);
                    //set the user managed projects in the reducer!
                    dispatch(setUserJoinedProjects(projectsJoined));
                });
        })
    }
    
}
