import React from 'react';
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    timeline: [],
    errors: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TIMELINE:
            return {
                ...state,
                timeline: action.timeline,
                error: false
            }
        default:
            return state;
    }
}

export default reducer;