import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const projectAdd = (title, description) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.ADD_PROJECT, title, description })
    }
}