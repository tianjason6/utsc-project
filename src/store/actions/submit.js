import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

import { CONTACT_US_CLOUDFUNCTION } from './../../GlobalVar';

export const submit = (submission) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SUBMISSION_LOADING
        })
        axios.post(CONTACT_US_CLOUDFUNCTION, submission)
        .then(res => {
            dispatch({
                type: actionTypes.SUBMISSION_SUCCESS
            })
        })
        .catch(error => {
            dispatch({
                type: actionTypes.SUBMISSION_ERROR
            })
        })
    }
}

export const successConfirmation = () => {
    return(dispatch) => {
        dispatch({
            type: actionTypes.POST_SUBMISSION
        })
        setTimeout(()=>{
            dispatch({
                type: actionTypes.SUBMISSION_TIMEOUT_TOGGLE
            })
        }, 10000);
    }
}