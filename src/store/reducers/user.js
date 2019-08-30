import * as actionTypes from '../actions/actionTypes';



const inititalState={
    user: {},
    error: false
}

const reducer = (state = inititalState, action) => {
    switch(action.type){
        case actionTypes.FETCH_USER:
            return{
                ...state,
                user: action.user,
                error: false
            }

        default:
            return state
    }
}
export default reducer;