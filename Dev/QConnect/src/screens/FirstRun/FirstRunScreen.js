import React, {Component} from 'react';
import {View, Text} from 'react-native';
import QcActionButton from 'components/QcActionButton'

class FirstRunScreen extends Component {
    onTeacherFlow = () =>{
        alert("Welcome dear teacher!");
    }

    render(){
        return (
          <View>
              <Text>بسم الله الرحمان الرحيم</Text>
              <QcActionButton
                text="I am a teacher"
                onPress={this.onTeacherFlow} />
            </View>  
        );
    }
}

export default FirstRunScreen;