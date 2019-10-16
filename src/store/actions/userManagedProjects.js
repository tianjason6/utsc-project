import * as actionTypes from './actionTypes';
import axios from '../../axios-projects'; 
import * as userActions from './user';

export const setUserManagedProjects = (projects) =>{
    return{
        type: actionTypes.SET_USER_MANAGED_PROJECTS,
        projects: projects
    };
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch(setUserManagedProjects([]));
    }
}

export const initUserManagedProjects =(username) =>{
    return(dispatch) =>{
        //get user
        axios.get('Users/' + username + '.json')
        .then(res => {
            let projectsManagedTitles = res.data.projectsManaged;
            if (projectsManagedTitles){
                let projectsManaged = projectsManagedTitles.map( projectTitle =>{
                    return axios.get('Projects/' + projectTitle + '.json');
                });
                //wait until i get all of the project data of the projects this user manages
                Promise.all(projectsManaged)
                    .then(res =>{
                        //we only want the data, so map only the data to a new array
                        const projectsManaged = res.map(project => project.data ); 
                        console.log('projects managed: ', projectsManaged)
                        //set the user managed projects in the reducer!
                        dispatch(setUserManagedProjects(projectsManaged))
                    });
            } else {
                dispatch(setUserManagedProjects([]))
            }
            
        })
    }
}