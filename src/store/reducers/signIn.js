import * as actionTypes from '../actions/actionTypes';

const initialState = {
  errorMessage: '',
  error: null, //null means untouched
  loading: false,
  token: null,
  userId: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        errorMessage: '',
        error: false,
        loading: true,
      }
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.idToken,
        userId: action.userId,
        error: false

      }

    case actionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        errorMessage: action.errorMessage,
        error: true,
        loading: false
      }
    case actionTypes.SIGN_IN_RESET:
      return {
        ...initialState
      }
    case actionTypes.SIGN_IN_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

export default reducer;