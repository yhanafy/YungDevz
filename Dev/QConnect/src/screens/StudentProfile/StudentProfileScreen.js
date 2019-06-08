import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, FlatList, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import colors from 'config/colors';
import { Rating } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import { editCurrentAssignment } from 'model/actions/editCurrentAssignment';
import { addNewAssignment } from 'model/actions/addNewAssignment';
import { updateStudentImage } from 'model/actions/updateStudentImage';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import strings from 'config/strings';
import studentImages from 'config/studentImages';
import TouchableText from 'components/TouchableText'
import ImageSelectionModal from 'components/ImageSelectionModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import QcParentScreen from 'screens/QcParentScreen';


class StudentProfileScreen extends QcParentScreen {

  name = "StudentProfileScreen";

  state = {
    isDialogVisible: false,
    averageGrade: 0,
    isModalVisible: false
  }

  //method updates the current assignment of the student
  editAssignment(classId, studentId, newAssignmentName) {
    if (newAssignmentName.trim() === "") {
      Alert.alert(strings.Whoops, strings.PleaseEnterAnAssignmentName);
    } else {
      this.props.editCurrentAssignment(classId, studentId, newAssignmentName);
      this.setState({ isDialogVisible: false });
    }
  }

  //---------- profile image views handlers --------------
  setModalVisible(visible) {
    this.setState({ isModalVisible: visible });
  }

  //this method saves the new profile information to the redux database
  saveProfileInfo = (teacherID) => {

    this.refs.toast.show("Your profile has been saved", DURATION.LENGTH_SHORT);
  }

  onImageSelected(index) {
    this.setState({ profileImageId: index })
    let { classId, studentId } = this.props.navigation.state.params;
    this.props.updateStudentImage(classId, studentId, index)
    this.setModalVisible(false);
  }

  getRatingCaption() {
    let caption = strings.GetStarted;

    if (averageRating > 4) {
      caption = strings.OutStanding
    }
    else if (averageRating >= 3) {
      caption = strings.GreatJob
    }
    else if (averageRating > 0) {
      caption = strings.PracticePerfect
    }

    return caption
  }

  //---------- main UI render ===============================
  render() {
    const { classId, studentId, currentStudent, currentAssignment, assignmentsHistory } = this.props
    const hasCurrentAssignment = currentAssignment.name === 'None' ? false : true;

    //retrieves the student's average rating. If the student hasn't had any assignments, then 
    //the rating will default to 0.
    averageRating = currentAssignment.grade;
    const dialogInitialText =  currentAssignment.name === 'None' ? {hintInput: strings.EnterAssignmentHere} : {initValueTextInput: currentAssignment.name} 

    return (
      <View style={styles.container}>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={strings.EditAssignment}
          {...dialogInitialText}
          dialogStyle={{ marginBottom: 100 }}
          submitInput={(inputText) =>
            this.editAssignment(classId, studentId, inputText)}
          closeDialog={() => { this.setState({ isDialogVisible: false }) }} />

        <ImageSelectionModal
          visible={this.state.isModalVisible}
          images={studentImages.images}
          cancelText="Cancel"
          setModalVisible={this.setModalVisible.bind(this)}
          onImageSelected={this.onImageSelected.bind(this)}
          screen={this.name}
        />

        {this.state.fontLoaded ? (
          <View style={styles.studentInfoContainer}>

            <View style={styles.profileInfo}>

              <View style={styles.profileInfoTop}>
                <View style={{ width: 100 }}>

                </View>
                <View style={styles.profileInfoTopRight}>
                  <Text numberOfLines={1} style={styles.bigText}>{currentStudent.name.toUpperCase()}</Text>
                  <View style={{ flexDirection: 'row', height: 25 }}>
                    <Rating readonly={true} startingValue={averageRating} imageSize={25} />
                    <View style={{flexDirection: 'column', justifyContent: 'center' }}>
                      <Text style={styles.ratingText}>{averageRating === 0? "": parseFloat(averageRating).toFixed(1)}</Text>
                    </View>
                  </View>
                  <Text style={styles.ratingDescText}>{this.getRatingCaption()}</Text>
                </View>
              </View>

              <View style={styles.profileInfoBottom}>
                <View style={styles.profileInfoTopLeft}>
                  <Image
                    style={styles.profilePic}
                    source={studentImages.images[this.state.profileImageId >= 0 ? this.state.profileImageId : currentStudent.imageId]} />
                  <TouchableText
                    text="update image"
                    onPress={() => this.setModalVisible(true)}
                    style={{ paddingRight: 0, paddingLeft: 0, marginLeft: 0, fontSize: 12 }}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', height: 59}}>
                  <Text numberOfLines={1} style={styles.assignmentTextLarge}>{currentAssignment.name.toUpperCase()}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableHighlight
                      onPress={() => { this.setState({ isDialogVisible: true }) }} >
                      <Text style={styles.assignmentActionText}>{strings.EditAssignment}</Text>
                    </TouchableHighlight>

                    {hasCurrentAssignment ? <TouchableHighlight onPress={() =>
                      this.props.navigation.push("EvaluationPage", {
                        studentId: studentId,
                        classId: classId
                      })} >
                      <Text style={styles.assignmentActionText}>{strings.Grade}</Text>
                    </TouchableHighlight> : <View />}
                  </View>
                </View>
              </View>

            </View>

            <ScrollView style={styles.prevAssignments}>
              <FlatList
                data={assignmentsHistory}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => this.props.navigation.push("EvaluationPage", {
                    classIndex: classIndex,
                    studentIndex: studentIndex,
                    assignmentName: item.name,
                    completionDate: item.completionDate,
                    rating: item.evaluation.overallGrade,
                    notes: item.evaluation.notes,
                    improvementAreas: item.evaluation.improvementAreas,
                    readOnly: true
                  })}>
                    <View style={styles.prevAssignmentCard} key={index}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.subText]}>{item.completionDate}</Text>
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
                          <Text style={{height: 20, marginTop: 5}}>{strings.ImprovementAreas}</Text>
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
        ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <LoadingSpinner isVisible={!this.state.fontLoaded} />
            </View>
          )
        }
      </View>
    );
  }
};

//styles for the entire page
const styles = StyleSheet.create({
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
  notesText: {
    fontSize: 14,
    fontFamily: 'regular',
    color: colors.black
  },
  assignmentActionText: {
    fontSize: 16,
    fontFamily: 'regular',
    color: colors.primaryDark,
    paddingLeft: 10,
    paddingRight: 10,
  },
  prevAssignmentTitleText: {
    fontFamily: 'regular',
    fontSize: 19,
    flex: 1,
    paddingLeft: 2
  },
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  studentInfoContainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
    flex: 1,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    justifyContent: "flex-end"
  },
  profileInfo: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    marginBottom: 10
  },
  nonButtons: {
    flexDirection: 'column'
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevAssignments: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    marginLeft: 7,
    marginRight: 7,
  },
  prevAssignmentCard: {
    flexDirection: 'column',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    height: 90,
    padding: 5,
  },
});

const mapStateToProps = (state, ownProps) => {
  const { classId, studentId } = ownProps.navigation.state.params;
  const currentStudent = state.data.students[studentId];
  let currentAssignment = {name: 'None', date: ''};
  let assignmentsHistory = []

  if(state.data.currentAssignments.byClassId[classId] && 
    state.data.currentAssignments.byClassId[classId].byStudentId[studentId] &&
    state.data.currentAssignments.byClassId[classId].byStudentId[studentId][0]){
      currentAssignment = state.data.currentAssignments.byClassId[classId].byStudentId[studentId][0];
    }

    if(state.data.assignmentsHistory.byStudentId[studentId] &&
      state.data.assignmentsHistory.byStudentId[studentId].byClassId[classId]){
        assignmentsHistory = state.data.assignmentsHistory.byStudentId[studentId].byClassId[classId];
    }

  return { classId, studentId, currentStudent, currentAssignment, assignmentsHistory };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editCurrentAssignment,
      addNewAssignment,
      updateStudentImage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfileScreen);