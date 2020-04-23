import * as actionTypes from '../actions/actionTypes';

const initialState = {
  // colors: {
  //   "red": false,
  //   "orange": false,
  //   "yellow": false,
  //   "green": false,
  //   "blue": false,
  //   "indigo": false,
  //   "violet": false,
  // },
  colors: [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
  ],
  players: {
    1: "",
    2: "",
    3: "",
    4: ""
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_COLOR:
      // return {
      //   ...state,
      //   colors: {
      //     ...state.colors,
      //     // use value of action.color as key
      //     [action.color]: true,
      //   }
      console.log({
        ...state,
        players: {
          ...state.players,
          // use value of action.color as key
          [action.player]: action.color,
        }
      });
      return {
        ...state,
        players: {
          ...state.players,
          // use value of action.color as key
          [action.player]: action.color,
        }
      }
    case actionTypes.DESELECT_COLOR:
      return {
        ...state,
        colors: {
          ...state.colors,
          // use value of action.color as key
          [action.color]: false,
        }
      }
    // case actionTypes.SELECT_RED:
    //   return {
    //     ...state,
    //     colors: {
    //       ...state.colors,
    //       red: true,
    //     }
    //   }
    // case actionTypes.SELECT_GREEN:
    //   return {
    //     ...state,
    //     colors: {
    //       ...state.colors,
    //       green: true,
    //     }
    //   }
    // case actionTypes.SELECT_BLUE:
    //   return {
    //     ...state,
    //     colors: {
    //       ...state.colors,
    //       blue: true,
    //     }
    //   }
    default:
      return state;
  }
}

export default reducer;