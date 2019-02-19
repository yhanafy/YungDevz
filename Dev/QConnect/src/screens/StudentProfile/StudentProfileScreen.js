import React, {Component} from 'react';
import {View, Image} from 'react-native';

class StudentProfileScreen extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View ID="studentProfile">
            <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/follower/512/login-man-person-human-body-512.png'}}
            style={{
            width: 200,
            height: 200,
            alignItems: 'center',
            borderRadius: 150 / 2,
            backgroundColor: "blue"
          }} />
          </View>
        );
      }
};

export default StudentProfileScreen;