import * as actionTypes from "./actionTypes";
import axios from "../../axios-projects";

export const setColors = colors => {
    return {
        type: actionTypes.FETCH_ALL_COLORS,
        byId: colors.byId,
        allIds: colors.allIds
    };
};

export const fetchColorsFailed = () => {
    return {
        type: actionTypes.FETCH_COLORS_FAILED
    };
};

export const initColors = () => {
    return dispatch => {
        axios
            .get("Colors.json")
            .then(res => {
                let colors = { ...res.data };
                delete colors["empty"];
                dispatch(setColors(colors));
            })
            .catch(error => {
                console.error(error);
                dispatch(fetchColorsFailed());
            });
    };
};


export const updateSelected = (color) => {
    return dispatch => {
        dispatch({
            type: actionTypes.COLOR_SELECT,
            color: color,
        });
    };
};


export const changeSelected = (prevColor, newColor) => {
    return dispatch => {
        dispatch({
            type: actionTypes.COLOR_SELECT_CHANGE,
            prevColor: prevColor,
            newColor: newColor
        });
    };
};
