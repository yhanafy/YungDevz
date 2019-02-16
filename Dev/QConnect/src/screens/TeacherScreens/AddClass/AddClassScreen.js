import React, { Component } from 'react';
import { View, Text, TextInput, Image, Platform, StyleSheet } from 'react-native';
import colors from 'config/colors'


class AddClassScreen extends Component {

  state = {
    className: '',
  }
  render() {
    const { navigate } = this.props.navigation;

    return (

      <View ID="addNewClass" style={{
        alignItems: "center",
        justifyContent: "center",
      }}>


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
        <Image source={{ uri: '<iframe width="901" height="507" src="https://www.youtube.com/embed/2TQWbxxyJUA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }}
          style={{
            width: 200,
            height: 200,
            alignItems: 'center',
            borderRadius: 150 / 2
          }} />

        <Text>Your Class name is {this.state.className}</Text>
      </View>
    );
  }



};

export default AddClassScreen;