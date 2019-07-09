import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import colors from '../../../config/colors';

export default class SignupSection extends Component {
  
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {this.props.onCreateAccount(); }}>
            <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Forgot Password?</Text>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 800
  },
  text: {
    color: colors.black,
    backgroundColor: 'transparent',
  },
});
