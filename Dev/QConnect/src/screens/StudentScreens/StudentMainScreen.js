//This screen will be the main screen that will display for students as a landing page for when they first
//sign up or log in
import React from 'react';
import QcParentScreen from "../QcParentScreen";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import studentImages from 'config/studentImages';
import { Rating } from 'react-native-elements';
import colors from 'config/colors'
import strings from 'config/strings';

export default class StudentMainScreen extends QcParentScreen {

    name = "StudentMainScreen";

    componentDidMount() {
        super.componentDidMount();
        //Fetches the data for this student and sets it to the state
    }

    //All the following data values are hard coded, we need to make them variable
    state = {
        studentName: 'Zyad Elgohary',
        profileImageID: 1,
        averageGrade: 4,
        totalAssignments: 3,
        isReady: true,
        currentAssignmet: 'Al-Baqara 1-6',
        assignmentHistory: [
            {
                name: 'Al-Shams',
                completionDate: "12/5/2019",
                evaluation: {
                    grade: 3,
                    notes: "Great progress on recitation",
                    improvementAreas: ["Qalqalah", 'Pronouncing']
                }
            },
            {
                name: 'Al-Noor',
                completionDate: "11/4/2018",
                evaluation: {
                    grade: 4,
                    notes: "A little more work on the second page",
                    improvementAreas: []
                }
            },
            {
                name: 'Al-Hajj',
                completionDate: "11/1/2018",
                evaluation: {
                    grade: 5,
                    notes: "Good tasmee, but work on mad",
                    improvementAreas: ["Mad"]
                }
            }
        ]
    }

    //Returns the correct caption based on the student's average grade
    getGradeCaption() {
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

        const { studentName, profileImageID, averageGrade, totalAssignments, isReady, currentAssignmet, assignmentHistory } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 0.5 }}></View>
                            <View style={{ flex: 1 }}>
                                <Image
                                    style={styles.profilePic}
                                    source={studentImages.images[profileImageID]} />
                            </View>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.studentNameStyle}>{studentName}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 2, justifyContent: 'center' }}>
                            <Rating readonly={true} startingValue={averageGrade} imageSize={25} />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.ratingDescText}>{averageGrade + "  "}</Text>
                                <Text style={styles.ratingDescText}>{this.getGradeCaption() + "  "}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.studentNameStyle}>{strings.TotalAssignments + " " + totalAssignments + "  "}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.middleView, { backgroundColor: (isReady ? colors.green : colors.red) }]}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        //To-Do: Updates the state of the assignment & communicates it with the teacher
                        this.setState({ isReady: !isReady })
                    }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{" "}</Text>
                            <Text style={styles.studentNameStyle}>{strings.CurrentAssignment}</Text>
                            <Text>{" "}</Text>
                            <Text style={[styles.studentNameStyle, { fontSize: 20 }]}>{currentAssignmet}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <Text>{"  "}</Text>
                            <Text style={styles.ratingDescText}>{isReady ? strings.Ready : strings.NotReady}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomView}>
                    <View style={{ flex: 0.1 }}></View>
                    <ScrollView style={styles.prevAssignments}>
                        <FlatList
                            data={assignmentHistory}
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
        flex: 1,
        flexDirection: 'column'
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
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
});