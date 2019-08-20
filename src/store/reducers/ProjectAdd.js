import * as actionTypes from '../actions/actionTypes';

const initialState = {
    title: null  //Adding just the title to begin with
}

const reducer = (state = initialState, action) => {
    console.log('projectAdd Reducer', action)
    switch (action.type) {
        case actionTypes.ADD_PROJECT:
            return {

            }
        default:
            return state;
    }
}

export default reducer;