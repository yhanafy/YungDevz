import React from 'react';
import {View} from 'react-native';
import {StudentCard} from 'components/StudentCard'
import {Picture} from 'assets/splash.png'

class ClassMainScreen extends React.Component {
    state = {
        students: []
    };

    componentDidMount() {
        const students = require('model/class.json').students.map(s => ({
                ...s
        }));
        this.setState( {students} );
    }

    render() {        
        return (
            <View>

                {this.state.students.forEach((student) => {
              return (
                <StudentCard
                    studentName={student.name}
                    profilePic={student.avatar}
                    currentAssignment={student.assignment}
                    onPress={() => this.props.navigation.navigate('StudentProfile', { name: student.name })}
                    />
              );
            })}
            </View>);
    }
}

export default ClassMainScreen;
