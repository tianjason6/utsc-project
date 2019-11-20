import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

import { URL_SIGN_UP, URL_VERIFY_EMAIL} from '../../GlobalVar';

export const signUp = () => {
  return {
    type: actionTypes.SIGN_UP,
  }
}

export const signUpFailed = (errorMessage) => {
  return {
    type: actionTypes.SIGN_UP_FAILED,
    errorMessage: errorMessage
  }
}

export const signUpReset = () => {
  console.log('inside sign up reducer')
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_UP_RESET,
    })
  }
}

export const loading = (loading) => {
  return {
    type: actionTypes.SIGN_UP_LOADING,
    loading: loading
  }
}

export const initSignUp = (email, password) => {

  return (dispatch) => {
    dispatch(loading(true));
    axios.post(URL_SIGN_UP, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .then((res) => {
        //send email confirmation
        axios.post(URL_VERIFY_EMAIL, {
          requestType: 'VERIFY_EMAIL',
          idToken: res.data.idToken
        })
          .then((res) => {
            dispatch(signUp());
          })
      })
      .catch((error) => {
        dispatch(signUpFailed(error.response.data.error.message));
      });
  }
}
