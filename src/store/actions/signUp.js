import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

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
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .then((res) => {
        //send email confirmation
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y', {
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
