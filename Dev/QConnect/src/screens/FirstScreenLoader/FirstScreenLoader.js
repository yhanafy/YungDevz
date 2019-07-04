import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { connect } from "react-redux";

class FirstScreenLoader extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the firstRunCompleted flag from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { firstRunCompleted } = this.props;

    // This will switch to the App screen or FirstRun screens and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(!firstRunCompleted ? 'App' : 'FirstRun');
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
  return { firstRunCompleted };
};

export default connect(mapStateToProps)(FirstScreenLoader);