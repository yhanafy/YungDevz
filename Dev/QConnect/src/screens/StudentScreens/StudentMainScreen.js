//This screen will be the main screen that will display for students as a landing page for when they first
//sign up or log in
import React from 'react';
import QcParentScreen from "../QcParentScreen";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import studentImages from 'config/studentImages';
import { Rating } from 'react-native-elements';
import colors from 'config/colors'
import strings from 'config/strings';
import { connect } from "react-redux";
import mapStateToCurrentStudentProps from './helpers/mapStateToCurrentStudentProps';
import { updateAssignmentStatus } from 'model/actions/updateAssignmentStatus';
import { bindActionCreators } from "redux";

class StudentMainScreen extends QcParentScreen {

    name = "StudentMainScreen";

    componentDidMount() {
        super.componentDidMount();
        //Fetches the data for this student and sets it to the state

    }

    //All the following data values are hard coded, we need to make them variable
    state = {
        student: this.props.student,
        isReady: this.props.student.isReady
    }

    //Returns the correct caption based on the student's average grade
    getRatingCaption() {
        let caption = strings.GetStarted;
        let { averageGrade } = this.state;

        if (averageGrade > 4) {
            caption = strings.OutStanding
        }
        else if (averageGrade >= 3) {
            caption = strings.GreatJob
        }
        else if (averageGrade > 0) {
            caption = strings.PracticePerfect
        }

        return caption
    }

    //Renders the screen
    render() {

        const { student } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <View style={styles.profileInfo}>
                        <View style={styles.profileInfoTop}>
                            <View style={{ width: 100 }}>
                            </View>
                            <View style={styles.profileInfoTopRight}>
                                <Text numberOfLines={1} style={styles.bigText}>{student.name.toUpperCase()}</Text>
                                <View style={{ flexDirection: 'row', height: 25 }}>
                                    <Rating readonly={true} startingValue={student.averageRating} imageSize={25} />
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={styles.ratingText}>{student.averageRating === 0 ? "" : parseFloat(student.averageRating).toFixed(1)}</Text>
                                    </View>
                                </View>
                                <Text style={styles.ratingDescText}>{this.getRatingCaption()}</Text>
                            </View>
                        </View>
                        <View style={styles.profileInfoBottom}>
                            <View style={styles.profileInfoTopLeft}>
                                <Image
                                    style={styles.profilePic}
                                    source={studentImages.images[student.imageId]} />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column', height: 59 }}>
                                <Text numberOfLines={1} style={styles.assignmentTextLarge}>{student.currentAssignment.toUpperCase()}</Text>
                                <Text style={styles.assignmentTextLarge}>{strings.TotalAssignments + " " + student.totalAssignments + "  "}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.middleView, { backgroundColor: (this.state.isReady === true ? colors.green : colors.red) }]}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        //To-Do: Updates the state of the assignment & communicates it with the teacher
                        if (student.currentAssignment !== "None") {
                            this.props.updateAssignmentStatus(!student.isReady);
                            this.setState({ isReady: !this.state.isReady });
                        }
                    }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{" "}</Text>
                            <Text>{" "}</Text>
                            <Text style={styles.studentNameStyle}>{strings.CurrentAssignment}</Text>
                            <Text>{" "}</Text>
                            <Text style={[styles.studentNameStyle, { fontSize: 20 }]}>{student.currentAssignment}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <Text>{"  "}</Text>
                            <Text style={styles.ratingDescText}>{this.state.isReady ? strings.Ready : strings.NotReady}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomView}>
                    <View style={{ flex: 0.1 }}></View>
                    <ScrollView style={styles.prevAssignments}>
                        <FlatList
                            data={student.assignmentHistory}
                            keyExtractor={(item, index) => item.name + index}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => {
                                    //To-Do: Navigates to more specific evaluation for this assignment
                                }}>
                                    <View style={styles.prevAssignmentCard} key={index}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.subText}>{item.completionDate}</Text>
                                            <View style={{ alignItems: 'center', flexWrap: 'wrap', alignSelf: 'baseline', flex: 1 }}>
                                                <Text numberOfLines={1} style={styles.prevAssignmentTitleText}>{item.name}</Text>
                                            </View>
                                            <Rating style={{ paddingRight: 10, paddingTop: 3 }} readonly={true}
                                                startingValue={item.evaluation.grade} imageSize={17} />
                                        </View>
                                        {item.evaluation.notes ?
                                            <Text numberOfLines={2} style={styles.notesText}>{"Notes: " + item.evaluation.notes}</Text>
                                            : <View />
                                        }
                                        {item.evaluation.improvementAreas && item.evaluation.improvementAreas.length > 0 ?
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                <Text style={{ height: 20, marginTop: 5 }}>{strings.ImprovementAreas}</Text>
                                                {item.evaluation.improvementAreas.map((tag) => { return (<Text key={tag} style={styles.corner}>{tag}</Text>) })}
                                            </View>
                                            : <View />
                                        }
                                    </View>

                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: colors.lightGrey,
        flex: 1
    },
    topView: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    profileInfoTop: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
    },
    profileInfoTopLeft: {
        flexDirection: 'column',
        marginLeft: 3,
        marginTop: -66,
        alignItems: 'center',
        width: 100
    },
    profileInfoTopRight: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    profileInfoBottom: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        paddingBottom: 10
    },
    middleView: {
        flex: 1,
    },
    bottomView: {
        flex: 3
    },
    studentNameStyle: {
        fontFamily: 'regular',
        fontSize: 18,
        color: colors.black,
    },
    ratingDescText: {
        fontSize: 18,
        fontFamily: 'light',
        color: colors.primaryDark
    },
    prevAssignmentCard: {
        flexDirection: 'column',
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        height: 90,
        padding: 5,
    },
    profileInfo: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        marginBottom: 10
    },
    notesText: {
        fontSize: 14,
        fontFamily: 'regular',
        color: colors.black
    },
    subText: {
        fontSize: 16,
        fontFamily: 'regular',
        color: colors.primaryDark
    },
    corner: {
        borderColor: '#D0D0D0',
        borderWidth: 1,
        borderRadius: 3,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5,
        marginTop: 5,
    },
    prevAssignments: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        flex: 1
    },
    prevAssignmentTitleText: {
        fontFamily: 'regular',
        fontSize: 19,
        flex: 1,
        paddingLeft: 2
    },
    profileInfo: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        marginBottom: 10
    },
    bigText: {
        fontSize: 24,
        fontFamily: 'regular',
    },
    subText: {
        fontSize: 16,
        fontFamily: 'regular',
        color: colors.primaryDark
    },
    ratingDescText: {
        fontSize: 18,
        fontFamily: 'light',
        color: colors.primaryDark
    },
    assignmentTextSmall: {
        fontSize: 14,
        fontFamily: 'regular',
        color: colors.black,
        paddingTop: 2
    },
    assignmentTextLarge: {
        fontSize: 20,
        fontFamily: 'regular',
        color: colors.darkGrey,
        paddingLeft: 10,
        paddingRight: 2,
        paddingTop: 5,
        textAlign: 'left'
    },
    ratingText: {
        fontSize: 24,
        fontFamily: 'regular',
        color: colors.darkGrey,
        marginLeft: 10,
    },
});

const mapStateToProps = (state) => {
    return mapStateToCurrentStudentProps(state)
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateAssignmentStatus
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(StudentMainScreen);