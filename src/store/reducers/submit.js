import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

const initialState = {
    error: false,
    message: ""
}

// type: actionTypes.SUBMISSION,
// status: 200,
// message: res.data 

export const submit = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SUBMISSION:
            return {
                ...state,
                error: action.status === 200,
                message: action.message
            }
    }
}