import React, { Component } from 'react';
import { View, Text, TextInput, Image, Platform, StyleSheet } from 'react-native';
import colors from 'config/colors'
import { addClass } from 'model/actions/addClass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';


class AddClassScreen extends Component {

  state = {

    className: '',
    className: 'HelloWorld',
  }

  addNewClass() {
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

    const { navigate } = this.props.navigation;



    return (

      <View ID="addNewClass" style={{
        alignItems: "center",
        justifyContent: "center"
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

            <Text
              Style={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center"
              }}>
              You have {this.props.classrooms.classes.length} classes, here they are:
          </Text>

          <View>{this.props.classrooms.classes.map((classroom, i) => {
            return (

              <View key={classroom.name} style={{ flex: 1, flexDirection: 'row' }}>

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

      </View>

    );
  }



};

export default AddClassScreen;