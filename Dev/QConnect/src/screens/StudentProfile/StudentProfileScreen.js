import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
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
  editAssignment(classIndex, studentIndex, newAssignmentName) {
    this.props.editCurrentAssignment(classIndex, studentIndex, newAssignmentName);
    this.setState({ isDialogVisible: false });
  }

  //method will add a new assignment for the student (only to current assignment, will not add
  //to assignment history until after completion of the assignment)
  addAssignment(classIndex, studentIndex, newAssignmentName) {
    this.props.addNewAssignment(classIndex, studentIndex,
      newAssignmentName);
    this.setState({ isDialogVisible: false })
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
    let { classIndex, studentIndex } = this.props.navigation.state.params;
    this.props.updateStudentImage(classIndex, studentIndex, index)
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
    const { classIndex, studentIndex } = this.props.navigation.state.params;
    const currentStudent = this.props.classes[classIndex].students[studentIndex];
    const hasCurrentAssignment = currentStudent.currentAssignment.name === 'None' ? false : true;

    //retrieves the student's average rating. If the student hasn't had any assignments, then 
    //the rating will default to 0.
    averageRating = currentStudent.totalAssignments === 0 ? 0.0 :
      (currentStudent.totalGrade / currentStudent.totalAssignments);
    const dialogInitialText = currentStudent.currentAssignment.name === 'None' ? { hintInput: strings.EnterAssignmentHere } : { initValueTextInput: currentStudent.currentAssignment.name }

    return (
      <View style={styles.container}>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={strings.EditAssignment}
          {...dialogInitialText}
          dialogStyle={{ marginBottom: 100 }}
          submitInput={(inputText) =>
          //If the student already has an existing assignment, then it will simply edit the
          //name of the current assignment, if not, then it will create a new assignment
          {
            hasCurrentAssignment ? this.editAssignment(classIndex, studentIndex,
              { name: inputText, startDate: new Date().toLocaleDateString("en-US") })
              : this.addAssignment(classIndex, studentIndex, inputText)
          }}
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
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                      <Text style={styles.ratingText}>{parseFloat(averageRating).toFixed(1)}</Text>
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
                <View style={{ flex: 1, flexDirection: 'column', height: 59 }}>
                  <Text numberOfLines={1} style={styles.assignmentTextLarge}>{currentStudent.currentAssignment.name.toUpperCase()}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableHighlight
                      onPress={() => { this.setState({ isDialogVisible: true }) }} >
                      <Text style={styles.assignmentActionText}>{strings.EditAssignment}</Text>
                    </TouchableHighlight>

                    {hasCurrentAssignment ? <TouchableHighlight onPress={() =>
                      this.props.navigation.push("EvaluationPage", {
                        studentIndex: studentIndex,
                        classIndex: classIndex
                      })} >
                      <Text style={styles.assignmentActionText}>{strings.Grade}</Text>
                    </TouchableHighlight> : <View />}
                  </View>
                </View>
              </View>

            </View>

            <ScrollView style={styles.prevAssignments}>
              <FlatList
                data={currentStudent.assignmentHistory}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => this.props.navigation.push("AssignmentEvaluation", {
                    classIndex: classIndex,
                    studentIndex: studentIndex,
                    assignmentName: item.name,
                    completionDate: item.completionDate,
                    rating: item.evaluation.overallGrade,
                    notes: item.evaluation.notes
                  })}>
                    <View style={styles.prevAssignmentCard} key={index}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.subText]}>{item.completionDate}</Text>
                        <View style={{ alignItems: 'center', flexWrap: 'wrap', alignSelf: 'baseline', flex: 1 }}>
                          <Text numberOfLines={1} style={styles.prevAssignmentTitleText}>{item.name}</Text>
                        </View>
                        <Rating style={{ paddingRight: 10, paddingTop: 3 }} readonly={true}
                          startingValue={item.evaluation.overallGrade} imageSize={17} />
                      </View>
                      {item.evaluation.notes ?
                        <Text numberOfLines={2} style={styles.notesText}>{"Notes: " + item.evaluation.notes}</Text>
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

const mapStateToProps = state => {
  const { classes } = state.data.teachers[0];
  return { classes };
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