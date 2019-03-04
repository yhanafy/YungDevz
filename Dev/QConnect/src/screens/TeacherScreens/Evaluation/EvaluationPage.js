import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import StudentCard from 'components/StudentCard'
import colors from 'config/colors'
import newStudentName from 'ClassEditScreen'
import { withBadge, Header } from 'react-native-elements';
import {ScrollView, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import StudentCard from 'components/StudentCard'
import colors from 'config/colors'

//This page is for the teacher to evaluate the students after they make memorazation. This page will consist  
class EvaluationPage extends Component {
    render(){
        return(
            <StudentCard
            key={i}
            studentname={studentname}
            profilePic={student.avatar}
            currentAssignment={student.assignment}
            />
        );
    
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'colomn',
        backgroundColor: colors.lightGrey,
        flex: 1
    },
    
})

//This is the header that will say Student Evalutation in the middle of the box      

//right under the Header of this page there will be the students profile pic/icon.

//Under the pic will be the name of the student that the teacher is evaluating

//UNder the name it is the students previous assignment that they just completed right then

//Under the assignment is going to be the How was ____Name____ tasmee' today only words

//under that there will be the five star rating for that person

//Under that there will be a {"Give a badge?"}

//Under that there is there four badges that cann all be clicked on to give to the student.

//under that there is text box that can be written and inside that text box says "write a note"

//At the very bottom in the footer there is a long ellipse button that is baige that will say Submit

//Right next to the submit button there is a text button which says Skip> 