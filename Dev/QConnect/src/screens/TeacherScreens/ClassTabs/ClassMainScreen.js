import React from 'react';
import {View} from 'react-native';
import {StudentCard} from 'components/StudentCard'
import {Picture} from 'assets/splash.png'

class ClassMainScreen extends React.Component {
    state = {
        students: [
            {
                name: "Khalid",
                avatar: {Picture},
                currentAssignment: "Al Baqara Page 1"
            },
            {
                name: "Zyad",
                avatar: {Picture},
                currentAssignment: "Al Nas Ayah 3"
            }
        ]
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

                {this.state.students.forEach((u) => {
              return (
                <StudentCard
                    studentName={u.name}
                    profilePic={u.avatar}
                    currentAssignment={u.assignment}
                    onPress={() => this.props.navigation.navigate('StudentProfile', { name: u.name })}
                    />
              );
            })}
            </View>);
    }
}

export default ClassMainScreen;
