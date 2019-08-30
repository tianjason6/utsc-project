import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';


export const fetchUser = ( username ) => {
    return (dispatch) => {
        axios.get('Users/' + username + '.json')
        .then(res => {
            dispatch({
                type: actionTypes.FETCH_USER,
                user: res.data
            });
        });
    }
}



