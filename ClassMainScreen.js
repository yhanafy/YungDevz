import React, {Component} from 'react';
import {View} from 'react-native';
import {StudentCard} from 'components/StudentCard'
import colors from 'config/colors'

class ClassMainScreen extends Component {
    state = {
        //A class id JSON file needs to be created holding all of the id's for the classes this
        //teacher has
        classId: "placeholder id",
        students: []
    };

    //A method needs to be written to get the class ids from the JSONFile
    componentDidMount() {
        const students = require('model/class.json').students.map(s => ({
                ...s
        }));
        this.setState( {students} );
    }

    //A hamburger menu component still needs to be created
    render() {        
        return (
            <View style = {styles.container}>
                <View style = {styles.topBanner}> 
                    <HamburgerMenu />
                    <Text style = {styles.classTitle}>{this.state.classId.className}</Text>
                </View>
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
                </View>
            </View>
            );
    }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    topBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'  
    },
    classTitle: {
        color: colors.primaryDark,
        fontSize: 25 
    }
});

export default ClassMainScreen;
