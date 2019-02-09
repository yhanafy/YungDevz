import React, {Component} from 'react';
import {View, Text} from 'react-native';

class AddClassScreen extends Component {

    render() {
        const { navigate } = this.props.navigation;
    
        return (
          <View ID="addNewClass">
            <Text>Add a new class placeholder</Text>
          </View>
        );
      }
};

export default AddClassScreen;