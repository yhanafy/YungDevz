
import React, { Component } from 'react';
import { View, Text, TextInput, Image, ScrollView , StyleSheet } from 'react-native';
import colors from 'config/colors'
import QcActionButton from 'components/QcActionButton'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addClass} from 'model/actions/addClass'
//import { addClass } from '../../../model/actions/addClass';


class AddClassScreen extends Component {

  state = {
    className: '',
  }

  addNewClass () {
    let classInfo = {
      name: this.state.className,
      students: []
    };

    this.props.addClass(classInfo);

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
            this.addNewClass();
          }}
        />

        <View>
          <Text>there are {this.props.classrooms.classes.length} classes added so far </Text>
        </View>

      </View>

    );
  }



};


const mapStateToProps = (state) => {
  const { classrooms } = state
  return { classrooms }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addClass,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddClassScreen);