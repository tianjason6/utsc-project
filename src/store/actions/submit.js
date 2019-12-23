import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const submit = (submission) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SUBMISSION_LOADING
        })
        axios.post("https://us-central1-utsc-projects.cloudfunctions.net/sendmail", submission)
        .then(res => {
            dispatch({
                type: actionTypes.SUBMISSION_SUCCESS
            })
        })
        .catch(error => {
            console.log(error.data);
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
