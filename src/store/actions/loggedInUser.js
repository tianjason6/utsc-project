import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const setLoggedInUser = (user) => { 
    return {
        type: actionTypes.SET_LOGGED_IN_USER,
        user: user
    }
}

export const userLogout = () => {
    return dispatch => {
        dispatch(setLoggedInUser(null));
    }
}

export const fetchLoggedInUser = (username) => {
    return (dispatch) => {
        axios.get('Users/' + username + '.json')
        .then(res => {
            console.log('setLoggedInUser', res.data)
            dispatch(setLoggedInUser(res.data));
        });
    }
}
