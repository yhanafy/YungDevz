import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SHOW_SIGN_IN_CONFIRMATION_MODAL,
  SHOW_SIGN_UP_CONFIRMATION_MODAL,
  CONFIRM_SIGNUP,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE,
  CONFIRM_LOGIN,
  CONFIRM_LOGIN_SUCCESS,
  CONFIRM_LOGIN_FAILURE
} from 'model/reducers/auth'
import * as actionTypes from './authActionTypes'
import { setFirstRunCompleted } from "model/actions/setFirstRunCompleted";

import { Alert } from 'react-native'
import { Auth } from 'aws-amplify'
import strings from 'config/strings'
import Analytics from '@aws-amplify/analytics';
import analyticsEvents from 'config/analyticsEvents'
import awsconfig from '../../../aws-exports';

function signUp() {
  return {
    type: actionTypes.SIGN_UP
  }
}

function signUpSuccess(user) {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(err) {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    error: err
  }
}

export function createUser(username, password, email, phone_number) {
  return (dispatch) => {
    dispatch(signUp())
    let phone = phone_number

    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number: phone
      }
    })
    .then(data => {
      Analytics.record({
        name: analyticsEvents.create_user_succeeded,
      })

      dispatch(signUpSuccess(data))
      dispatch(showSignUpConfirmationModal())
    })
    .catch(err => {
      console.log('error signing up: ', err)
      Analytics.record({
        name: analyticsEvents.create_user_failed,
        attributes:  {...err} 
      })

      Alert.alert(strings.ErrorSigningUp, "" + (err.message || err))
      dispatch(signUpFailure(err))
    });
  }
}

function logIn() {
  return {
    type: actionTypes.LOG_IN
  }
}

export function logOut() {
  return {
    type: actionTypes.LOG_OUT
  }
}

function logInSuccess(user) {
  return {
    type: actionTypes.LOG_IN_SUCCESS,
    user: user
  }
}

function logInFailure(err) {
  return {
    type: actionTypes.LOG_IN_FAILURE,
    error: err
  }
}

export function authenticate(username, password, navigation, nextScreenName) {
  return (dispatch) => {
    dispatch(logIn())
    Auth.signIn(username, password)
      .then(user => {
        console.log("successful login")
        Analytics.record({
          name: analyticsEvents.login_succeeded,
        })
        
        dispatch(logInSuccess(user))
        dispatch(setFirstRunCompleted(true));
        navigation.navigate(nextScreenName);
      })
      .catch(err => {
        Analytics.record({
          name: analyticsEvents.login_failed,
          attributes:  {...err} 
        })

        Alert.alert(strings.ErrorSigningIn, "" + (err.message || err))
        dispatch(logInFailure(err))
      });
  }
}

export function showSignInConfirmationModal() {
  return {
    type: actionTypes.SHOW_SIGN_IN_CONFIRMATION_MODAL
  }
}

export function showSignUpConfirmationModal() {
  return {
    type: actionTypes.SHOW_SIGN_UP_CONFIRMATION_MODAL
  }
}

export function confirmUserSignUp(username, password, authCode, navigation, nextScreenName) {
  return (dispatch) => {
    dispatch(confirmSignUp())
    Auth.confirmSignUp(username, authCode)
      .then(data => {
        Analytics.record({
          name: analyticsEvents.confirm_new_user_succeeded
        })

        dispatch(confirmSignUpSuccess())
        dispatch(authenticate(username, password, navigation, nextScreenName))
      })
      .catch(err => {
        console.log('error signing up: ', err)
        Analytics.record({
          name: analyticsEvents.confirm_new_user_failed,
          attributes:  {...err} 
        })
  
        Alert.alert(strings.ErrorSigningUp, "" + (err.message || err))
        dispatch(confirmSignUpFailure(err))
      });
  }
}

function confirmSignUp() {
  return {
    type: actionTypes.CONFIRM_SIGNUP
  }
}

function confirmSignUpSuccess() {
  return {
    type: actionTypes.CONFIRM_SIGNUP_SUCCESS
  }
}

function confirmSignUpFailure(error) {
  return {
    type: actionTypes.CONFIRM_SIGNUP_FAILURE,
    error
  }
}
