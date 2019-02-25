import React, {Component} from 'react'
import {ListItem} from 'react-native-elements'
import PropTypes from 'prop-types';
import colors from "config/colors";
import FontLoadingComponent from './FontLoadingComponent';

// a card that displays one menu item in the left navigation menu (hamburger menu)
// params: 
class QcDrawerItem extends FontLoadingComponent {
    render() {
        return(
        <ListItem
                backgroundColor={colors.white}
                containerStyle={{ margin: 5, marginTop: 0, borderBottomWidth: 1, borderBottomColor: colors.lightGrey }}
                title={this.props.title}
                fontFamily='regular'
                leftAvatar={this.props.image? {
                  rounded: true,
                  source: this.props.image
                } : {
                  rounded: true,
                  icon: {
                    name: this.props.icon,
                    type: 'font-awesome',
                    color: colors.primaryDark,
                  },
                  overlayContainerStyle: {
                    backgroundColor: colors.primaryLight,
                  }
                } }

                onPress={() => this.props.onPress()}
              />
              )
    }
}

QcDrawerItem.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
}

export default QcDrawerItem;