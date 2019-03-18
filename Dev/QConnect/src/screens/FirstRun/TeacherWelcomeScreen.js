import React, {Component} from 'react';
import QcActionButton from 'components/QcActionButton'
import {View} from 'react-native'

class TeacherWelcomeScreen extends Component {

    onTeacherFlow = () => {
        //todo: get the first class to show from redux persist (current class)
          this.props.navigation.push('TeacherScreens', { classIndex: 0, classTitle: "Quran Clas"});
      }

    render(){

        const { navigation } = this.props;


        return(
            <View style={{
                marginTop: 150
            }}>
            <QcActionButton
                        navigation={navigation}
                        text="Save"
                        onPress={this.onTeacherFlow} />
            </View>
        );
    }
}

export default TeacherWelcomeScreen;