import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const add = (title) => {
    return {
        type: actionTypes.ADD_PROJECT,
        title: title
    }
}
