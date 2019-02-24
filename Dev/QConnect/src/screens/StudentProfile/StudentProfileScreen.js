import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import StudentCard from 'components/StudentCard'

class StudentProfileScreen extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View ID="studentProfile"
          Style={{
            justifyContent: "center",
          }}>
            <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/follower/512/login-man-person-human-body-512.png'}}
            style={{
            width: 200,
            height: 200,
            alignItems: 'center',
            borderRadius: 150 / 2,
          }} />

          <Text
          Style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }} >Student Name:</Text>
          </View>
        );
      }
};

export default StudentProfileScreen;