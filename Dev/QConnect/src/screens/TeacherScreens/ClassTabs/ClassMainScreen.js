import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import HamburgerIcon from 'assets/images/Hamburger_icon.png';
import StudentCard from 'components/StudentCard';
import colors from 'config/colors';

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

render() {    
    return (
     //This is the top banner that will be outside the scroll view. It will contain the
    //the hamburger icon that will navigate to the side menu along with the class name
    <View style={styles.container}>
        <View style={styles.topBanner}>
            <Image 
            source={HamburgerIcon} 
            style={styles.hamburger}
            onPress={() => {
            //Navigate to menu
            }}/>
        </View>
        <ScrollView style={styles.container}>{this.state.students.map((student, i) => {
            return (
            <StudentCard
                key={i}
                studentName={student.name}
                profilePic={student.avatar}
                currentAssignment={student.assignment}
                onPress={() => this.props.navigation.navigate('StudentProfile', { name: student.name })}
            />
            );
        })}
        </ScrollView>
    </View>);
}
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1
    },
    classTitle: {
        color: colors.primaryDark,
        fontSize: 25 
    },
    topBanner: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 25
    },
    hamburger: {
        height: 15,
        width: 15
    }
});

export default ClassMainScreen;
