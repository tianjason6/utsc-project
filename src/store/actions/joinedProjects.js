import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

import * as loggedInUserAction from './loggedInUser';

export const setUserJoinedProjects = (projects) =>{
    return{
        type: actionTypes.SET_USER_JOINED_PROJECTS,
        projects: projects
    }
}
export const userLogout = () => {
    return (dispatch) => {
        dispatch(setUserJoinedProjects([]));
    }
}

export const leaveJoinedProjects = (username, joinedProjects, removeProject) => {
    return (dispatch) => {
        console.log('leaveJoinedProjects action username: ',username);
        console.log('leaveJoinedProjects action removeproject: ',removeProject);
        console.log('leaveJoinedProjects action joined projects: ', joinedProjects)
        const removedJoinedProjectArray = joinedProjects.filter( project =>{
            return project != removeProject
        });
        console.log(removedJoinedProjectArray)
        axios.put(('Users/' + username  + '/projectsJoined.json'), removedJoinedProjectArray)
        .then(res => {
            dispatch(setUserJoinedProjects(removedJoinedProjectArray));
            // updating the logged in user
            dispatch(loggedInUserAction.fetchLoggedInUser(username));
        });
    }
}

export const initJoinedProjects = (projectsJoinedTitles) => {
    //get user
    return(dispatch) => {
        if(projectsJoinedTitles){
            let projectsJoined = projectsJoinedTitles.map( projectTitle =>{
                return axios.get('Projects/' + projectTitle + '.json');
            });
            //wait until i get all of the project data of the projects this user joined
            Promise.all(projectsJoined)
                .then(res =>{
                    //we only want the data, so map only the data to a new array
                    const projectsJoined = res.map(project => project.data ); 
                    console.log('projects joined: ', projectsJoined);
                    //set the user managed projects in the reducer!
                    dispatch(setUserJoinedProjects(projectsJoined));
                });
        }
    }
}
