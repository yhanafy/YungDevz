import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Form from './Form';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import QcAppBanner from 'components/QcAppBanner'
import { Auth } from 'aws-amplify';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("assets/images/read_child_bg.jpg");


export default class LoginScreen extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  state = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
  };

  onUserNameChange = (_username) => {
    this.setState({ username: _username });
  }

  onPwChange = (_pwd) => {
    this.setState({ password: _pwd });
  }

  onEmailChange = (_email) => {
    this.setState({ email: _email });

  }

  onPhoneNumberChange = (_phoneNumber) => {
    this.setState({ phone_number: _phoneNumber });
  }

  getInfoFromUserInput = () => {
    return { username: "elyasse", email: "elyassee@outlook.com", phone_number: "425-223-3333" };
  }

  onSignIn = async () => {
    username = this.state.username;
    password = this.state.password;

    try {
        const user = await Auth.signIn(username, password);
        if(!this._isMounted){
          return null;
        }

        if (user.challengeName === 'SMS_MFA' || 
            user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            // You need to get the code from the UI inputs
            // and then trigger the following function with a button click
            const code = getCodeFromUserInput();
            // If MFA is enabled, sign-in should be confirmed with the confirmation code
            const loggedUser = await Auth.confirmSignIn(
                user,   // Return object from Auth.signIn()
                code,   // Confirmation code  
                mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
            );
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
            // You need to get the new password and required attributes from the UI inputs
            // and then trigger the following function with a button click
            // For example, the email and phone_number are required attributes
            const { username, email, phone_number } = getInfoFromUserInput();
            const loggedUser = await Auth.completeNewPassword(
                user,               // the Cognito User Object
                newPassword,       // the new password
                // OPTIONAL, the required attributes
                {
                    email,
                    phone_number,
                }
            );
        } else if (user.challengeName === 'MFA_SETUP') {
            // This happens when the MFA method is TOTP
            // The user needs to setup the TOTP before using it
            // More info please check the Enabling MFA part
            Auth.setupTOTP(user);
        } else {
            // The user directly signs in
            console.log(user);
        } 
    } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
            // The error happens if the user didn't finish the confirmation step when signing up
            // In this case you need to resend the code and confirm the user
            // About how to resend the code and confirm the user, please check the signUp part
        } else if (err.code === 'PasswordResetRequiredException') {
            // The error happens when the password is reset in the Cognito console
            // In this case you need to call forgotPassword to reset the password
            // Please check the Forgot Password part.
        } else if (err.code === 'NotAuthorizedException') {
            // The error happens when the incorrect password is provided
        } else if (err.code === 'UserNotFoundException') {
            // The error happens when the supplied username/email does not exist in the Cognito user pool
        } else {
            console.log(err);
        }
    }

    console.log("new new new hello world --------->>>>>")
    this.props.navigation.navigate('App', { classId: 0, classTitle: "Quran Class"});
  }

  onCreateAccount = () => {
    console.log("called oncreateaccount...")
    this.props.navigation.push('TeacherWelcomeScreen');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={{ flex: 3 }} />

          <QcAppBanner />
          <View style={{ flex: 1 }} />
          <Form
            onUserNameChange={this.onUserNameChange.bind(this)}
            onPwChange={this.onPwChange.bind(this)}
          />

          <SignupSection 
            onCreateAccount={this.onCreateAccount.bind(this)}
          />
          <ButtonSubmit
            onSubmit={this.onSignIn.bind(this)} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spacer: {
    flex: 3
  },
  bgImage: {
    flex: 5,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  }
});
