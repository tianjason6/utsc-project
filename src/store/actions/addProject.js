import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const add = (title, description) => {
    return {
        type: actionTypes.ADD_PROJECT,
        title: title,
        description: description
    }
}
