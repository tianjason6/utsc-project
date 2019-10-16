import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';
import firebase from 'firebase';

export const projectAdd = (title, description, imgs, authUser) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.ADD_PROJECT, title, description, imgs, authUser })
    }
}

export const initProjectAdd = (title, description, imgs, authUser) => {
    return (dispatch) => {
        var username;
        var projectsJoined = [];
        var projectsManaged = [];
        var projectAdmin = false;
        var userData = null;
        var projectData = null;

        // Getting the username (without email extension)
        for (var i = 0; i < authUser.length; i++) {
            if (authUser.charAt(i) == "@") {
                username = authUser.substring(0, i);
                break;
            }
        }

        // Fetching the project names
        axios.get('Projects/' + title + '.json')
            .then(res => {
                projectData = res.data;
            });

        if (projectData == null) {    // If project does not exist, put request
            putProject(title, description, username, imgs);
            // Fetching the user values
            axios.get('Users/' + username + '.json')
                .then(res => {
                    userData = res.data;
                    if (userData != null) { // If user exists, update with current values
                        projectsManaged = userData.projectsManaged;
                        projectsJoined = userData.projectsJoined;
                        projectAdmin = userData.isAdmin;
                        projectsManaged.push(title);
                        putUser(username, authUser, projectAdmin, projectsJoined, projectsManaged);
                    } else {    // If user does not exist, create a new set of values
                        putUser(username, authUser, projectAdmin, [], [title]);
                    }
                });

        } else {    // If project already exists, send error message
            alert("A project with this name already exists");
        }
    }

    function putProject(title, description, username, imgs) {
        axios.put('Projects/' + title + '.json', {
            title: title,
            description: description,
            owner: username,
            imgs: imgs
        });
    }

    function putUser(username, authUser, projectAdmin, projectsJoined, projectsManaged) {
        axios.put('Users/' + username + '.json', {
            email: authUser,
            isAdmin: projectAdmin,
            projectsManaged: projectsManaged,
            projectsJoined: projectsJoined,
            username: username
        });
    }
}