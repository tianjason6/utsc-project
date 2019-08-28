import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const projectAdd = (title, description) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.ADD_PROJECT, title, description })
    }
}

export const initProjectAdd = (title, description) => {
    return (dispatch) => {
        console.log(title);

        axios.put('Projects/' + title + '.json', {
            title: title,
            description: description,
            owner: "Jason",
            imgs: ["test.png", "gg.jpg"]
        })

    }
}