import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';
import store from '../../store/reducers/auth.js';

export const projectAdd = (title, description, imgs) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.ADD_PROJECT, title, description, imgs })
    }
}

export const initProjectAdd = (title, description, imgs) => {
    return (dispatch) => {
        console.log(title);

        axios.put('Projects/' + title + '.json', {
            title: title,
            description: description,
            owner: store.getState().email,
            imgs: imgs
        });
    }
}