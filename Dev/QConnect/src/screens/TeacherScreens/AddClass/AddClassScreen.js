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
            <QcActionButton
                        navigation={navigation}
                        text="Add Class"
                        onPress={this.onTeacherFlow}  />

          </View>
        );
      }

      

};

export default AddClassScreen;