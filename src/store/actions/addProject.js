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
        axios.put('Projects/' + title + '.json', {
            title: title,
            description: description,
            owner: authUser,
            imgs: imgs
        });
    }
}