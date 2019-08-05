import * as actionTypes from '../actions/actionTypes';



const inititalState={
    user: {},
    error: false
}

const reducer = (state=inititalState, action) => {
    console.log("USER REDUCEr");
    switch(action.type){
        case actionTypes.FETCH_USER:
            console.log("FETCH USER CASE");
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