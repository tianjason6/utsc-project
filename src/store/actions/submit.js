import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const submit = (submission) => {
    return (dispatch) => {
        axios.post("https://us-central1-utsc-projects.cloudfunctions.net/sendmail", submission)
        .then(res => {
            dispatch({
                type: actionTypes.SUBMISSION,
                status: res.status,
                message: res.data 
            })
        })
    }
}