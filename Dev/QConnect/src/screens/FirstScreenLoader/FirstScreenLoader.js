import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { connect } from "react-redux";
import Analytics from '@aws-amplify/analytics';
import analyticsEvents from 'config/analyticsEvents'
import awsconfig from '../../../aws-exports';

class FirstScreenLoader extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the firstRunCompleted flag from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { firstRunCompleted, userLoggedIn } = this.props;

    // This will switch to the App screen or FirstRun screens and this loading
    // screen will be unmounted and thrown away.
    if(!firstRunCompleted){
      Analytics.record({
        name: analyticsEvents.first_screen_loaded,
        attributes: { firstScreen: "FirstRun" }
      })
      this.props.navigation.navigate('FirstRun')
    } else if (!userLoggedIn){
      Analytics.record({
        name: analyticsEvents.first_screen_loaded,
        attributes: { firstScreen: "Login" }
      })
      this.props.navigation.navigate('Login')
    } else {
      Analytics.record({
        name: analyticsEvents.first_screen_loaded,
        attributes: { firstScreen: "App" }
      })
      this.props.navigation.navigate('App')
    }
  };

  // Placeholder loading in case async fetch takes too long
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const firstRunCompleted = state.data.firstRunCompleted;
  const userLoggedIn = state.auth.user.username;
  return { firstRunCompleted, userLoggedIn };
};

export default connect(mapStateToProps)(FirstScreenLoader);