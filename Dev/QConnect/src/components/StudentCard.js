import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import colors from 'config/colors'

/*Class represents the student card that will show up in the list of students
*from the teachers view.
*Each card will have a student name, a profile picure for the student, and the student's
*current assignment.
*The card will also be able to be pressed which controls the color of the card (Student Status)
*/
export default class StudentCard extends Component {
    render() {
        //The properties of the component.
        const {studentName, profilePic, currentAssignment, onPress} = this.props;
        return(
            //The style of the card as a whole. Inside the card, you have the image,
            //student name, and student assignment
            <TouchableOpacity
                style = {styles.cardStyle}
                //The on press function is for when the teacher clicks the card, the color of it 
                //should change depending on the behavior (i.e attendence screen)
                onPress = {() => {onPress()}}>
                <Image
                    style = {styles.profilePicStyle}
                    source = {profilePic}/>
                <View 
                    style = {styles.infoStyle}>
                    <Text style = {styles.studentNameStyle}>{studentName}</Text>
                    <Text style = {styles.assignmentStyle}>{currentAssignment}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

/*
*Makes sure properties that are passed into component are valid. The student name must be a string,
*the source of the image must be a number, the current assignment is also a string, and the onPress
*must be a function
*/
StudentCard.propTypes = {
    studentName: PropTypes.string.isRequired,
    profilePic: PropTypes.number.isRequired,
    currentAssignment: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

//Styles that control the look of the card, and everything within it
const styles = StyleSheet.create({
    cardStyle: {

        flexDirection: 'row',
        marginRight: 7,
        height: 100,
        marginLeft: 7,
        marginTop: 10,
        backgroundColor: colors.white,
        borderColor: colors.black
        
    
    },
    infoStyle: {

        marginLeft: 40,
        flexDirection: 'column',
        justifyContent: 'center',
    

    },
    profilePicStyle: {

        marginTop: 15,
        marginLeft: 15,
        width: 70,
        height: 70, 
        borderRadius: 35

    },
    studentNameStyle: {

        fontSize: 30,
        color: colors.primaryDark
    },
    assignmentStyle: {

        fontSize: 20,
        color: colors.primaryDark
    }
});