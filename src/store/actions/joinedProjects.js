import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

import * as loggedInUserAction from './loggedInUser';

export const setUserJoinedProjects = (projects) =>{
    return{
        type: actionTypes.SET_USER_JOINED_PROJECTS,
        projects: projects
    }
}

export const saveProject = (project, username, joinedProjects) => {
   //console.log("Project: ", project)
    return (dispatch) => {
        const newArray = [...joinedProjects, project.title];
        console.log("Prpject: ", project, "Username: ", username);
        axios.put(('Users/' + username  + '/projectsJoined.json'), newArray)
        .then(res => {
            dispatch(setUserJoinedProjects(newArray));
            // updating the logged in user
            dispatch(loggedInUserAction.fetchLoggedInUser(username));
        })
        // .then(res => {
        //     if (res.data === null) {
        //         axios.put(('Users/' + username  + '/projectsJoined.json'), [project.title])
        //     }
        //     else {
        //         axios.put(('Users/' + username  + '/projectsJoined.json'), [...res.data, project.title])
        //     }
        //     console.log("Response: ", res)
        // })
     //   axios.put(('Users/' + username  + '/projectsJoined.json'), project)
    }
        
    
}
export const userLogout = () => {
    return (dispatch) => {
        dispatch(setUserJoinedProjects([]));
    }
}

export const leaveJoinedProjects = (username, joinedProjects, removeProject) => {
    return (dispatch) => {
        const removedJoinedProjectArray = joinedProjects.filter( project =>{
            return project != removeProject
        });
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
                    //set the user managed projects in the reducer!
                    dispatch(setUserJoinedProjects(projectsJoined));
                });
        }
    }
}
