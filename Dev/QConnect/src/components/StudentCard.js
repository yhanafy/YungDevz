import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from 'config/colors'
import FontLoadingComponent from './FontLoadingComponent';

/*Class represents the student card that will show up in the list of students
*from the teachers view.
*Each card will have a student name, a profile picture for the student, and the student's
*current assignment.
*The card will also be able to be pressed which controls the color of the card (Student Status)
*/
export default class StudentCard extends FontLoadingComponent {

    render() {
        //The properties of the component.
        const { studentName, profilePic, currentAssignment, background, onPress, comp } = this.props;
        return (
            //The style of the card as a whole. Inside the card, you have the image,
            //student name, and student assignment
            <View>
                {this.state.fontLoaded ? (
                    <TouchableOpacity
                        style={[styles.cardStyle, { backgroundColor: background }]}
                        borderColor={colors.black}
                        //The on press function is for when the teacher clicks the card, the color of it 
                        //should change depending on the behavior (i.e attendance screen)
                        onPress={() => { onPress() }}>
                        <Image
                            style={styles.profilePicStyle}
                            source={profilePic} />
                        <View
                            style={styles.infoStyle}>
                            {currentAssignment ? (
                                <View>
                                    <Text numberOfLines={1} style={styles.studentNameStyle}>{studentName}</Text>
                                    <Text numberOfLines={1} style={styles.assignmentStyle}>{currentAssignment}</Text>
                                </View>
                            ) : (
                                    <View>
                                        <Text numberOfLines={1} style={styles.studentNameStyle}>{studentName}</Text>
                                    </View>
                                )}
                        </View>
                        <View style={styles.removeStudentStyle}>
                            {comp}
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View></View>
                    )
                }
            </View>
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
    currentAssignment: PropTypes.string,
    onPress: PropTypes.func.isRequired,
}

//Styles that control the look of the card, and everything within it
const styles = StyleSheet.create({
    cardStyle: {
        flexDirection: 'row',
        marginRight: 7,
        height: 100,
        alignItems: 'center',
        marginLeft: 7,
        marginTop: 10,
        fontFamily: 'regular',
    },
    removeStudentStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20
    },
    infoStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'regular',
        flex: 1
    },
    profilePicStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 20
    },
    studentNameStyle: {
        fontFamily: 'regular',
        fontSize: 20,
        color: colors.black,
        marginLeft: 20
    },
    assignmentStyle: {
        fontFamily: 'regular',
        fontSize: 16,
        color: colors.darkGrey,
        marginLeft: 20
    }
});