import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import StudentCard from 'components/StudentCard'
import colors from 'config/colors'

class ClassMainScreen extends Component {

    render() {    
        return (<ScrollView style={styles.container}>{this.props.classrooms.classes[0].students.map((student, i) => {
            return (
            <StudentCard
                key={i}
                studentName={student.name}
                profilePic={student.avatar}
                currentAssignment={student.assignment}
                onPress={() => this.props.navigation.navigate('StudentProfile', { name: student.name })}
            />
            );
        })}</ScrollView>);
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
    }
});

const mapStateToProps = (state) => {
    const { classrooms } = state
    return { classrooms }
  };
  
  export default connect(mapStateToProps)(ClassMainScreen);
  