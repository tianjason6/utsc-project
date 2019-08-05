import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';


export const fetchUser = ( username ) => {
    return (dispatch) => {
        console.log('username');
        console.log("input username: "+username);
        axios.get('Users/' + username + '.json')
        .then(res => {
            console.log("res data");
            console.log(res.data);
            dispatch({
                type: actionTypes.FETCH_USER,
                user: res.data
            });
        });
    }
}



