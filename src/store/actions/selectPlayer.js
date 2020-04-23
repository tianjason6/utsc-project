import * as actionTypes from "./actionTypes";

export const playerSelectColor = (playerNumber, selectedColor) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SELECT_COLOR,
      player: playerNumber,
      color: selectedColor
    })
  }
}