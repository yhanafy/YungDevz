import React, { Component } from 'react';
import { View, Text, TextInput, Image, ToastAndroid, ScrollView, StyleSheet } from 'react-native';
import colors from 'config/colors'
import QcActionButton from 'components/QcActionButton'
import { addClass } from 'model/actions/addClass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';

class AddClassScreen extends Component {

  state = {
    className: 'HelloWorld',
  }

  addNewClass(){
    let classInfo = 
    {
        name: this.state.className,
        students: [],
    };
    this.props.addClass(
      classInfo
      );

    ToastAndroid.show(this.state.className + " class is now added", ToastAndroid.SHORT);
  }

  render() {
    
    return (

      <View ID="addNewClass" style={{
        alignItems: "center",
      }}>
    <ScrollView>
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

        <Text>(This is temp UI for debug purposes, final UI will come next iA)</Text>
        <Text>You have {this.props.classrooms.classes.length} classes, here they are:</Text>
        <View>{this.props.classrooms.classes.map((classroom, i) => {
          return (
            <View key={classroom.name} style={{flex: 1, flexDirection: 'row'}}>
            <Icon
          name="group"
          size={15}
          type="font-awesome"
          iconStyle={{ paddingLeft: 10 }}
        />
            <Text>{classroom.name}</Text>
            </View>
          )
        })}</View>
      </ScrollView>
        <Text>Here Are Your Classes: </Text>
        <Text>{} </Text>
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