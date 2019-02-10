import React, {Component} from 'react';
import {View, Text} from 'react-native';

class StudentProfileScreen extends Component {

    render() {
        const { navigate } = this.props.navigation;
    
        return (
          <View ID="studentProfile">
            <Text>StudentProfile placeholder</Text>
          </View>
        );
      }
};

export default StudentProfileScreen;