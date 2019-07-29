import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from 'config/colors'
import FontLoadingComponent from 'components/FontLoadingComponent'
import Analytics from '@aws-amplify/analytics';
import analyticsEvents from 'config/analyticsEvents'

class QcActionButton extends FontLoadingComponent {

  onButtonPress() {
    Analytics.record({
      name: analyticsEvents.button_pressed,
      attributes: { text: this.props.text, screenName: this.props.screen }
    })
    this.props.onPress();
  }

  render() {
    const { text } = this.props;
    return (
      <TouchableOpacity style={styles.buttonStyle}
        onPress={() => this.onButtonPress()}
      >
        {this.state.fontLoaded ? (
          <Text style={styles.textStyle}>{text}</Text>
        ) : (
            <Text style={styles.textStyleNoFont}>{text}</Text>
          )
        }
      </TouchableOpacity>
    );
  }
}

QcActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  screen: PropTypes.string,
};


const styles = StyleSheet.create({
  buttonStyle: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

  },
  textStyle: {
    color: colors.primaryDark,
    fontFamily: 'regular',
  },
  textStyleNoFont: {
    color: colors.primaryDark,
  },
});

export default QcActionButton;