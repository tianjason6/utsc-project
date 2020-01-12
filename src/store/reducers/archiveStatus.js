import * as actionTypes from '../actions/actionTypes';

const initialState = {
    // key is project title and value isArchived
    status: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ARCHIVE_STATUS:
            let newStatus = state.status
            newStatus[action.pTitle] = action.status
            return {
                ...state,
                status: newStatus
            }
        default:
            return state;
    }
}

export default reducer;