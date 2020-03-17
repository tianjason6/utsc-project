import * as actionTypes from "./actionTypes";

export const initPlayerColors = (colors) => {
  return dispatch => { dispatch({
    type: actionTypes.INITIAL_PLAYER_COLOR,
    colors: colors,
  }); };
};

export const changePlayerColors = (player, color) => {
  return dispatch => { dispatch({
    type: actionTypes.CHANGE_PLAYER_COLOR,
    player: player,
    color: color
  }); };
};
