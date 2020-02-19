import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: [],
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALL_PROJECTS:
            return {
                ...state,
                projects: action.projects,
                error: false
            }
        case actionTypes.FETCH_PROJECTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;