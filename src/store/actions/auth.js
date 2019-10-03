import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';
import history from '../../history';

import * as joinedProjectsAction from './joinedProjects';
import * as userManagedProjectsAction from './userManagedProjects';

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
  //jlee trying things out
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireDate');
    

    //jlee remove userJoinedProjects and userManagedProjects (if it exists? dont think it does)
    console.log('jlee auth logout')
    dispatch(joinedProjectsAction.userLogout());
    userManagedProjectsAction.userLogout();

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
  

  // ***************
  // localStorage.removeItem('token');
  // localStorage.removeItem('userId');
  // localStorage.removeItem('expireDate');
  // history.push('/');
  // return {
  //   type: actionTypes.LOGOUT,
  //   email: null,
  //   signedIn: false,
  //   idToken: null,
  //   idTokenExpiryDate: null,
  //   isAdmin: false
  // }
}

// export const authCheckState = () => {
//   console.log('inside sign in action')
//   return (dispatch) => {

//     //if token did not expire, login

//     // else logout
//     dispatch({
//       type: actionTypes.LOGOUT,
//     })
//   }
// }

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
        
        dispatch(login(userEmail, token, expireDate, false));        
        dispatch(checkTokenTimeout( (expireDate.getTime() - (new Date().getTime()))/1000 ));
      }
    }

  }
}