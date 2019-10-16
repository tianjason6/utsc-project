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
            //jlee dont think i need refresh if i update the logged in user
            // window.location.reload()
            dispatch(setUserJoinedProjects(removedJoinedProjectArray));
            //jlee updating the logged in user
            dispatch(loggedInUserAction.fetchLoggedInUser(username));
        });
    }
}
//jlee if above works, you can delete this
// export const leaveJoinedProjects = (username, removeProject) => {
//     return (dispatch) => {
//         console.log(username);
//         console.log(removeProject);
//         axios.get('Users/' + username + '/projectsJoined.json')
//             .then( res =>{
//                 const joinedProjects = res.data;
//                 console.log(joinedProjects)
//                 const removedJoinedProjectArray = joinedProjects.filter( project =>{
//                     return project != removeProject
//                 });
//                 console.log(removedJoinedProjectArray)
//                 axios.put(('Users/' + username  + '/projectsJoined.json'), removedJoinedProjectArray)
//                 .then(res => {
//                     window.location.reload()
//                     dispatch(setUserJoinedProjects(removedJoinedProjectArray));
//                 });
//             });
//     }
// }

export const initJoinedProjects = (projectsJoinedTitles) => {
    //get user
    return(dispatch) => {
        if(projectsJoinedTitles){
            console.log('jlee projects joined titles: ', projectsJoinedTitles)
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
//jlee testing above
// export const initJoinedProjects = (username) => {
//     //get user
//     return(dispatch) => {
//         axios.get('Users/' + username + '.json')
//         .then(res => {
//             let projectsJoinedTitles = res.data.projectsJoined;
//             if(projectsJoinedTitles){
//                 let projectsJoined = projectsJoinedTitles.map( projectTitle =>{
//                     return axios.get('Projects/' + projectTitle + '.json');
//                 });
//                 //wait until i get all of the project data of the projects this user joined
//                 Promise.all(projectsJoined)
//                     .then(res =>{
//                         //we only want the data, so map only the data to a new array
//                         const projectsJoined = res.map(project => project.data ); 
//                         console.log('projects joined: ', projectsJoined);
//                         //set the user managed projects in the reducer!
//                         dispatch(setUserJoinedProjects(projectsJoined));
//                     });
//             }
            
//         })
//     }
    
// }
