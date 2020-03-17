import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
    byId: {},
    allIds: [],
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_COLORS:
            let colors = {};

            for (let id in action.allIds) {
                let color = action.byId[action.allIds[id]];
                if (color) {
                    colors[action.allIds[id]] = { ...color, selected: false };
                }
            }
            return {
                ...state,
                byId: colors,
                allIds: action.allIds,
                error: false
            }
        case actionTypes.COLOR_SELECT:
            const { color } = action;
            return update(state, {
                byId: {
                    [color]: {
                        selected: { $set: true }
                    }
                }
            });
        case actionTypes.COLOR_SELECT_CHANGE:
            const { prevColor, newColor } = action
            return update(state, {
                byId: {
                    [prevColor]: {
                        selected: { $set: false }
                    },
                    [newColor]: {
                        selected: { $set: true }
                    }
                }
            });
        case actionTypes.FETCH_COLORS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;