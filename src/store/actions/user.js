import * as actionTypes from "./actionTypes";
import axios from "../../axios-projects";

export const fetchUser = username => {
  return dispatch => {
    axios.get("Users/" + username + ".json").then(res => {
      console.log("fetchUser action res data ", res);
      dispatch({
        type: actionTypes.FETCH_USER,
        user: res.data
      });
    });
  };
};
