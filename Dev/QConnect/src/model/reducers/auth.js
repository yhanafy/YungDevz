import * as actionTypes from 'model/actions/authActionTypes'

const initialState = {
  isAuthenticating: false,
  user: {},

  signUpError: false,
  signInError: false,

  showSignUpConfirmationModal: false,
  showSignInConfirmationModal: false,

  confirmedLogin: false,
  confirmedSignUp: false,

  confirmSignUpError: false,
  confirmLoginError: false,

  signInErrorMessage: '',
  signUpErrorMessage: '',

  confirmLoginErrorMessage: '',
  confirmSignUpErrorMessage: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SHOW_SIGN_IN_CONFIRMATION_MODAL:
      return {
        ...state,
        isAuthenticating: false,
        showSignInConfirmationModal: true
      }
      case actionTypes.SHOW_SIGN_UP_CONFIRMATION_MODAL:
      return {
        ...state,
        isAuthenticating: false,
        showSignUpConfirmationModal: true
      }
    case actionTypes.CONFIRM_SIGNUP:
      return {
        ...state,
        isAuthenticating: true
      }
    case actionTypes.CONFIRM_SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        showSignUpConfirmationModal: false,
        confirmedSignUp: true,
      }
    case actionTypes.CONFIRM_SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        confirmSignUpError: false,
        confirmSignupErrorMessage: action.error.message || action.error
      }
    case actionTypes.SIGN_UP:
      return {
        ...state,
        isAuthenticating: true,
      }
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        signUpError: false,
        signUpErrorMessage: ''
      }
    case actionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signUpError: true,
        signUpErrorMessage: action.error.message || action.error
      }
    case actionTypes.LOG_IN:
      return {
        ...state,
        isAuthenticating: true,
        signInError: false
      }
    case actionTypes.LOG_IN_SUCCESS:
      return {
        isAuthenticating: false,
        user: action.user,
        showSignInConfirmationModal: true
      }
    case actionTypes.LOG_IN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signInError: true,
        signInErrorMessage: action.error.message || action.error
      }
    case actionTypes.CONFIRM_LOGIN: {
      return {
        ...state,
        isAuthenticating: true
      }
    }
    case actionTypes.CONFIRM_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        showSignInConfirmationModal: false,
        confirmedLogin: true,
      }
    case actionTypes.CONFIRM_LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticating: false
      }
    }
    case actionTypes.LOG_OUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}