import * as actionTypes from '../actions/actionTypes';

const initialState = {
    title: null,  //Adding just the title to begin with
    description: null
}

const reducer = (state = initialState, action) => {
    console.log('projectAdd Reducer', action)
    switch (action.type) {
        case actionTypes.ADD_PROJECT:
            return {
                title: action.title,
                description: action.description,
            }
        default:
            return state;
    }
}

export default reducer;