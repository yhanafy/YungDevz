import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import StudentCard from 'components/StudentCard'
import colors from 'config/colors'

//const { directions: { SWIPE_UP, SWIPE_LEFT, SWIPE_DOWN, SWIPE_RIGHT } } = swipeable;

class ClassAttendanceScreen extends React.Component {

    state = {
        selectedStudents: []
    }

    onStudentSelected = (id) => {
        let tmp = this.state.selectedStudents;
    
        if ( tmp.includes( id ) ) {
          tmp.splice( tmp.indexOf(id), 1 );
        } else {
          tmp.push( id );
        }
    
        this.setState({
          selectedStudents: tmp
        });
      }
    

    render() {
        return (<ScrollView style={styles.container}>{this.props.classrooms.classes[0].students.map((student, i) => {
            let url = this.state.selectedStudents.includes(i)? {uri: 'https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/tick_green.png'} : {uri: student.avatar};
            
            return (
            <StudentCard
                key={i}
                studentName={student.name}
                profilePic={url}
                currentAssignment={student.assignment}
                onPress={() => this.onStudentSelected(i) }
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
  
  export default connect(mapStateToProps)(ClassAttendanceScreen);