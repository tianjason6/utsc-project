import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const login = (email, idToken, idTokenExpiryDate, isAdmin) => {
  return {
    type: actionTypes.LOGIN,
    email: email,
    idToken: idToken,
    idTokenExpiryDate: idTokenExpiryDate,
    isAdmin: isAdmin
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  }
}

export const authCheckState = () => {
  console.log('inside sign in action')
  return (dispatch) => {

    //if token did not expire, login

    // else logout
    dispatch({
      type: actionTypes.LOGOUT,
    })
  }
}
