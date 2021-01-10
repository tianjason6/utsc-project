import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: [],
    error: false
};
const reducer = (state=initialState, action) =>{
    switch(action.type) {
        case actionTypes.SET_USER_MANAGED_PROJECTS:
            return{
                ...state,
                projects: action.projects,
                error: false
            }
        default:
            return state;
    }
}

export default reducer;