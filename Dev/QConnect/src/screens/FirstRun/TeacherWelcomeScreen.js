import React, {Component} from 'react';
import QcActionButton from 'components/QcActionButton'

class TeacherWelcomeScreen extends Component {

    onTeacherFlow = () => {
        //todo: get the first class to show from redux persist (current class)
          this.props.navigation.push('TeacherScreens', { classIndex: 0, classTitle: "Quran Clas"});
      }

    render(){
        const { navigation } = this.props;
        return(
            <QcActionButton
                        navigation={navigation}
                        text="Save"
                        onPress={this.onTeacherFlow} />
        );
    }
}

export default TeacherWelcomeScreen;