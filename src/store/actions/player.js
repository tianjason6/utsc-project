import * as actionTypes from "./actionTypes.js";
export const updatePlayerColor = player => {
  return {
    type: actionTypes.UPDATE_PLAYER_COLOR,
    player: player
  };
};
