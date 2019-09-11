import * as actionTypes from '../actions/actionTypes';

const initialState = {
    title: null,  //Adding just the title to begin with
    description: null,
    imgs: [null, null, null, null]
}

const reducer = (state = initialState, action) => {
    console.log('projectAdd Reducer', action)
    switch (action.type) {
        case actionTypes.ADD_PROJECT:
            return {
                title: action.title,
                description: action.description,
                imgs: action.imgs
            }
        default:
            return state;
    }
    console.log('projectAdd Reducer', action.title)
    console.log('projectAdd Reducer', state)


}

export default reducer;