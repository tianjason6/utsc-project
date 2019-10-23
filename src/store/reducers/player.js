import * as actionTypes from "../actions/actionTypes";

const initialState = {
  players: [
    { playerId: 0, playerColor: "#FF0000" },
    { playerId: 1, playerColor: "#FF7F00" },
    { playerId: 2, playerColor: "#FFFF00" },
    { playerId: 3, playerColor: "#00FF00" }
  ],
  usedColors: [true, true, true, true, false, false, false]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PLAYER_COLOR:
      const newPlayerList = { ...state.players };
      const prevColor = newPlayerList[action.player.playerId].playerColor;
      const color = action.player.playerColor;
      // set used player color list
      const dropDownList = [
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#8B00FF"
      ];
      const newUsedColors = { ...state.usedColors };
      for (let i = 0; i < 7; i++) {
        if (color == dropDownList[i]) {
          newUsedColors[i] = true;
        }
        if (prevColor == dropDownList[i]) {
          newUsedColors[i] = false;
        }
      }

      console.log("new used color list ", newUsedColors);
      // set player color
      newPlayerList[action.player.playerId].playerColor =
        action.player.playerColor;
      return {
        ...state,
        players: newPlayerList,
        usedColors: newUsedColors
      };
    default:
      return state;
  }
};
export default reducer;
