import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

import * as authActions from './auth';
import * as loggedInUserAction from './loggedInUser';

export const signIn = (authData) => {
  console.log(authData);
  return {
    type: actionTypes.SIGN_IN,
    authData: authData
  }
}

export const signInFailed = (errorMessage) => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    errorMessage: errorMessage
  }
}

export const signInReset = () => {
  console.log('inside sign in action')
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_IN_RESET,
    })
  }
}

export const signInSuccess = (idToken, userId) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    idToken: idToken,
    userId: userId
  }
}


export const loading = (loading) => {
  return {
    type: actionTypes.SIGN_IN_LOADING,
    loading: loading
  }
}  

export const initSignIn = (email, password) => {
  return (dispatch) => {
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .then((res) => {
        console.log('login res: ', res.data)
        let authData = res.data
        let authHeaders = res.headers

        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y', {
          idToken: res.data.idToken
        })
          .then((res) => {
            console.log('user info res: ' + res.data)
            console.log(res.data);
            let userData = res.data.users[0];
            if (userData.emailVerified === false) {
              let e = Error('Email not verified');
              e.name = 'UNVERIFIED_EMAIL';
              throw e;
            }

            localStorage.setItem('token', authData.idToken);
            localStorage.setItem('userId', authData.localId);
            localStorage.setItem('email', authData.email);
            const expireDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
            localStorage.setItem('expireDate', expireDate);
            dispatch(signInSuccess(authData.idToken, authData.localId));
            dispatch(authActions.checkTokenTimeout (authData.expiresIn));
            // need to add admin dispatch
            console.log('dispatching authactions', authData)
            dispatch(authActions.login(authData.email, authData.idToken, authHeaders.expires, authData.isAdmin))
            dispatch(loggedInUserAction.fetchLoggedInUser(authData.email.split('@')[0]));
          })
          .catch((error) => {
            console.log('get user data error')
            console.log(error)
            console.log(error.message)
            try {
              dispatch(signInFailed(error.response.data.error.message));
            } catch {
              dispatch(signInFailed(error.message));
            }
          });
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response)
        dispatch(signInFailed(error.response.data.error.message));
      });
  }
}
