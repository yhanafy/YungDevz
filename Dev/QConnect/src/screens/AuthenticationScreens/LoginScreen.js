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

  onCreateAccount = () => {
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
            text={strings.Login}
            onSubmit={this.signIn.bind(this)}
            navigation={this.props.navigation}
            screen="LoginScreen" />
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

