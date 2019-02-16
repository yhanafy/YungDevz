import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

class AddClassScreen extends Component {

  state = {
    className:'',
  }
    render() {
        return (
          <View ID="addNewClass">
            <TextInput
             placeholder='Write Class Name Here'
              onChangeText={(classInput) => this.setState({
                className: classInput,
              })}
            />

            <Text>Your Class name is {this.state.className}</Text>
          </View>
        );
      }

      

};

export default AddClassScreen;