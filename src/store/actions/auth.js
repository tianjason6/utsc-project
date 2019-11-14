import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';
import history from '../../history';

import * as joinedProjectsAction from './joinedProjects';
import * as userManagedProjectsAction from './userManagedProjects';
import * as loggedInUserAction from './loggedInUser';

export const login = (email, idToken, idTokenExpiryDate) => {
  return {
    type: actionTypes.LOGIN,
    email: email,
    idToken: idToken,
    idTokenExpiryDate: idTokenExpiryDate,
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireDate');

    dispatch(joinedProjectsAction.userLogout());
    dispatch(userManagedProjectsAction.userLogout());
    dispatch(loggedInUserAction.userLogout());

    dispatch({
      type: actionTypes.LOGOUT,
      email: null,
      signedIn: false,
      idToken: null,
      idTokenExpiryDate: null,
      isAdmin: false
    });
    history.push('/');
  }
}

export const checkTokenTimeout = (expiresIn) =>{
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);//setTimeout expects miliseconds, so we are fixing our seconds into milliseconds
  }
}

export const checkAuthToken = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else  {
      const expireDate = new Date(localStorage.getItem('expireDate'));
      if (expireDate < new Date()) {
        dispatch(logout());
      } else {
        const userEmail = localStorage.getItem('email');
        
        dispatch(login(userEmail, token, expireDate));        
        dispatch(checkTokenTimeout( (expireDate.getTime() - (new Date().getTime()))/1000 ));
        dispatch(loggedInUserAction.fetchLoggedInUser(userEmail.split('@')[0]));
      }
    }

  }
}