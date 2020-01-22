import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: false,
    message: "",
    loading: false,
    success: false,
    timeout: false
}

const submit = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SUBMISSION_LOADING:
            return {
                ...state,
                loading: true,
                message: "Your form is being submitted, please be patient :)"
            }
        case actionTypes.SUBMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: "Your form has been submitted, thank you for your feedback :)"
            }
        case actionTypes.SUBMISSION_ERROR:
            return {
                ...state,
                error: true,
                message: "Your form submission has failed, please contact David Liu :("
            }
        case actionTypes.SUBMISSION_TIMEOUT_TOGGLE:
            return {
                ...state,
                timeout: !state.timeout
            }
        case actionTypes.POST_SUBMISSION:
            return {
                ...state,
                success: false,
                timeout: true
            }
        default:
            return state;
    }
}

export default submit;