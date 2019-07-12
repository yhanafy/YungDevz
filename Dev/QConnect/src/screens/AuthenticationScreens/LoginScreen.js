import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, StyleSheet, Modal, Text } from 'react-native';
import PropTypes from 'prop-types';
import Form from './Form';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import QcAppBanner from 'components/QcAppBanner'
import { Auth } from 'aws-amplify';
import { authenticate, confirmUserLogin } from 'model/actions/authActions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button } from 'react-native-elements'
import strings from "config/strings";
import QcActionButton from "components/QcActionButton";
import colors from "config/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("assets/images/read_child_bg.jpg");


class LoginScreen extends Component {
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
    authCode: ""
  };

  onUserNameChange = (_username) => {
    this.setState({ username: _username });
  }

  onPwChange = (_pwd) => {
    this.setState({ password: _pwd });
  }

  onAuthCodeChanged = value => {
    this.setState({ authCode: value })
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

  }

  onCreateAccount = () => {
    console.log("called oncreateaccount...")
    this.props.navigation.navigate('TeacherWelcomeScreen');
  }

  signIn() {
    const { username, password } = this.state
    this.props.authenticate(username, password, this.props.navigation, "App")
  }

  confirm() {
    const { authCode } = this.state
    this.props.confirmUserLogin(authCode, this.props.navigation)
  }

  render() {
    const { auth: {
      loginErrorMessage,
      isAuthenticating,
      loginError,
      showSignInConfirmationModal
    }} = this.props

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
            style={{top: -95}}
            text="LOGIN"
            onSubmit={this.signIn.bind(this)}
            navigation={this.props.navigation} />
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
  },
  modal: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 230,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.grey,
    borderBottomWidth: 1,
    shadowColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    marginLeft: 45,
    marginRight: 45,
    paddingRight: 5,
    paddingLeft: 5
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authenticate,
      confirmUserLogin
    },
    dispatch
  );

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

