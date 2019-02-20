import React, { Component } from 'react';
import { View, Text, TextInput, Image, Platform, StyleSheet } from 'react-native';
import colors from 'config/colors'
import QcActionButton from 'components/QcActionButton'
import { addClass } from '../../../model/actions/addClass';


class AddClassScreen extends Component {

  state = {
    className: '',
  }



  render() {
    const { navigate } = this.props.navigation;

    return (

      <View ID="addNewClass" style={{
        alignItems: "center",
      }}>

        <Image source={{ uri: 'https://cdn0.iconfinder.com/data/icons/activities-glyph/2048/2154_-_Sitting_in_class-512.png' }}
          style={{
            width: 200,
            height: 200,
            alignItems: 'center',
            borderRadius: 150 / 2,
            justifyContent: 'center'
          }} />

        <TextInput
          style={{

            backgroundColor: colors.lightGrey,
            borderColor: colors.darkGrey,
            width: 250,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center"

          }}

          placeholder='Write Class Name Here'

          onChangeText={(classInput) => this.setState({

            className: classInput,

          })}


        />

        <Text>Your Class name is {this.state.className}</Text>

        <QcActionButton
          text="Add Class"
          onPress={() => {
            //Add class button
            addClass;
          }}
        />

        <Text>Here Are Your Classes: </Text>
        <Text>{} </Text>
      </View>

    );
  }



};

export default AddClassScreen;