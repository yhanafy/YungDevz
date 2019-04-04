import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import colors from 'config/colors';
import QcActionButton from "components/QcActionButton"
import { Rating, Icon } from 'react-native-elements';
import fonts from 'config/colors';
import DialogInput from 'react-native-dialog-input';
import { editCurrentAssignment } from 'model/actions/editCurrentAssignment';
import { addNewAssignment } from 'model/actions/addNewAssignment';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import studentImages from 'config/studentImages';
import TouchableText from 'components/TouchableText'
import FontLoadingComponent from 'components/FontLoadingComponent'

class StudentProfileScreen extends FontLoadingComponent {

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
    this.setState({ profileImageId: index, })
    this.setModalVisible(false);
  }

  //---------- main UI render ===============================
  render() {
    const { navigate } = this.props.navigation;
    const { classIndex, studentIndex } = this.props.navigation.state.params;
    const currentStudent = this.props.classes[classIndex].students[studentIndex];
    const hasCurrentAssignment = currentStudent.currentAssignment.name === 'None' ? false : true;

    //retrieves the student's average rating. If the student hasn't had any assignments, then 
    //the rating will default to 0.
    averageRating = currentStudent.totalAssignments === 0 ? 0.0 :
      (currentStudent.totalGrade / currentStudent.totalAssignments);

    return (
      <View style={styles.container}>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title="Edit Assignment"
          hintInput="Enter assignment here..."
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
        />

        <View style={styles.studentInfoContainer}>

          <View style={styles.profileInfo}>

            <View style={styles.profileInfoTop}>
              <View style={{ width: 100 }}>

              </View>
              <View style={styles.profileInfoTopRight}>
                <Text style={styles.bigText}>{currentStudent.name.toUpperCase()}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Rating readonly={true} startingValue={averageRating} imageSize={25} />
                  <Text style={styles.ratingText}>{averageRating.toLocaleString("EN-US", { minimumFractionDigits: 0 })}</Text>
                </View>
                <Text style={styles.ratingDescText}>{averageRating >= 3 ? 'Outstanding!' : 'Needs Work'}</Text>
              </View>
            </View>

            <View style={styles.profileInfoBottom}>
              <View style={styles.profileInfoTopLeft}>
                <Image
                  style={styles.profilePic}
                  source={studentImages.images[currentStudent.imageId]} />
                <TouchableText
                  text="update image"
                  onPress={() => this.setModalVisible(true)}
                  style={{ paddingRight: 0, paddingLeft: 0, marginLeft: 0, fontSize: 14 }}
                />
              </View>

              <View style={{ flexDirection: 'column', borderBottomColor: colors.lightGrey, borderBottomWidth: 1 }}>
              <Text style={styles.assignmentTextLarge}>{currentStudent.currentAssignment.name.toUpperCase()}</Text>
                <View style={{ flexDirection: 'row'}}>
                  <TouchableHighlight
                    onPress={() => { this.setState({ isDialogVisible: true }) }} >
                    <Text style={styles.assignmentActionText}>Edit</Text>
                  </TouchableHighlight>

                  {hasCurrentAssignment ? <TouchableHighlight onPress={() =>
                  this.props.navigation.push("EvaluationPage", {
                  studentIndex: studentIndex,
                  classIndex: classIndex
                })} >
                <Text style={styles.assignmentActionText}>Grade</Text>
              </TouchableHighlight> : <View />}
                </View>
              </View>
              {/* <Text style={styles.assignmentTextLarge}>{currentStudent.currentAssignment.name.toUpperCase()}</Text>

              <TouchableHighlight
                onPress={() => { this.setState({ isDialogVisible: true }) }} >
                <Text style={styles.assignmentActionText}>Edit</Text>

              </TouchableHighlight>
              {hasCurrentAssignment ? <TouchableHighlight onPress={() =>
                this.props.navigation.push("EvaluationPage", {
                  studentIndex: studentIndex,
                  classIndex: classIndex
                })} >
                <Text style={styles.assignmentActionText}>Grade</Text>
              </TouchableHighlight> : <View />} */}

            </View>

          </View>

          <ScrollView style={styles.prevAssignments}>
            <FlatList
              data={currentStudent.assignmentHistory}
              keyExtractor={(item, index) => item.name}
              renderItem={({ item, index }) => (
                <View style={styles.prevAssignmentCard} key={index}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.subText, { paddingLeft: 10, paddingTop: 3 }]}>{item.completionDate}</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.prevAssignmentTitleText}>{item.name}</Text>
                    </View>
                    <Rating style={{ paddingRight: 10, paddingTop: 3 }} readonly={true}
                      startingValue={item.evaluation.overallGrade} imageSize={17} />
                  </View>
                  {item.evaluation.notes ?
                    <View style={{ padding: 10 }}>
                      <Text style={styles.notesText}>{"Notes: " + item.evaluation.notes}</Text>
                    </View>
                    : <View />
                  }
                </View>
              )}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
};

//styles for the entire page
const styles = StyleSheet.create({
  bigText: {
    fontSize: 24,
    fontFamily: fonts.regular
  },
  subText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.primaryDark
  },
  ratingDescText: {
    fontSize: 20,
    fontFamily: fonts.light,
    color: colors.primaryDark
  },
  assignmentTextSmall: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black,
    paddingTop: 2
  },
  assignmentTextLarge: {
    fontSize: 20,
    fontFamily: fonts.regular,
    color: colors.darkGrey,
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    fontSize: 24,
    fontFamily: fonts.regular,
    color: colors.darkGrey,
    marginLeft: 10,
  },
  notesText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black
  },
  assignmentActionText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.primaryDark,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
  prevAssignmentTitleText: {
    fontFamily: fonts.regular,
    fontSize: 19
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
    marginTop: -63,
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
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginTop: 10,
  },
  prevAssignmentCard: {
    flexDirection: 'column',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    height: 80,
    justifyContent: 'space-between',
    paddingTop: 10,
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
      addNewAssignment
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfileScreen);