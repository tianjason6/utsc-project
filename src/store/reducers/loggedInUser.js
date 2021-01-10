import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loggedInUser: null,
    error: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        default:
            return state;
    }
}

export default reducer;