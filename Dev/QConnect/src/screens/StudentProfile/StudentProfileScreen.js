import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import colors from 'config/colors';
import QcActionButton from "components/QcActionButton"
import { Rating } from 'react-native-elements';
import fonts from 'config/colors';
import DialogInput from 'react-native-dialog-input';
import { editCurrentAssignment } from 'model/actions/editCurrentAssignment';
import { addNewAssignment } from 'model/actions/addNewAssignment';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import studentImages from 'config/studentImages';
import TouchableText from 'components/TouchableText'

class StudentProfileScreen extends Component {

  state = {
    isDialogVisible: false,
    averageGrade: 0,
    isModalVisible: false
  }

  //Method retrieves the current average rating for the current student
  /*
  getAverageRating() {
    const { classIndex, studentIndex } = this.props.navigation.state.params;
    const currentStudent = this.props.classes[classIndex].students[studentIndex];
    const assignmentHistory = currentStudent.assignmentHistory;
    let averageGrade = 0;
    for(let i = 0; i < assignmentHistory.length; i++){
      averageGrade += assignmentHistory[i].overallGrade;
    }
    averageGrade = averageGrade / assignmentHistory.length;

    this.setState({ isDialogVisible: false, averageGrade: averageGrade });
  }
  */

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
    this.setState({profileImageId: index,})
    this.setModalVisible(false);
  }

  //---------- main UI render ===============================
  render() {
    const { navigate } = this.props.navigation;
    const { classIndex, studentIndex } = this.props.navigation.state.params;
    const currentStudent = this.props.classes[classIndex].students[studentIndex];
    const hasCurrentAssignment = currentStudent.currentAssignment.name === 'None' ? false : true;

    //Retrieves the student's average rating
    const assignmentHistory = currentStudent.assignmentHistory;
    let rating = 0;
    for (let i = 0; i < assignmentHistory.length; i++) {
      rating += assignmentHistory[i].evaluation.overallGrade;
    }
    rating = rating / assignmentHistory.length;

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
            hasCurrentAssignment ? this.editAssignment(classIndex, studentIndex, inputText)
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

        <View style={styles.profileInfo}>

          <View style={styles.profileInfoTop}>
            <View style={styles.profileInfoTopLeft}>
              <Image
                style={styles.profilePic}
                source={studentImages.images[currentStudent.imageId]} />
                <TouchableText
                text= "update image"
                onPress={() => this.setModalVisible(true)}
                />
            </View>
            <View style={styles.profileInfoTopRight}>
              <Text style={styles.bigText}>{currentStudent.name}</Text>
              <Rating readonly={true} startingValue={rating} imageSize={25} />
              <Text style={styles.subText}>{rating >= 3 ? 'Outstanding!' : 'Needs Work'}</Text>
            </View>
          </View>

          <View style={styles.profileInfoBottom}>
            <Text style={styles.subText}>{'Current Assignment: ' + currentStudent.currentAssignment.name}</Text>
          </View>

        </View>

        <View style={styles.buttons}>
          <QcActionButton text={hasCurrentAssignment ? 'Edit Assignment' : 'Add Assignment'}
            onPress={() => { this.setState({ isDialogVisible: true }) }} />
          <QcActionButton text='Grade Assignment' onPress={() =>
            this.props.navigation.push("EvaluationPage", {
              studentIndex: studentIndex,
              classIndex: classIndex
            })} />
        </View>

        <ScrollView style={styles.prevAssignments}>
          <Text>Placeholder for past assignments</Text>
        </ScrollView>
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
    fontSize: 14,
    fontFamily: fonts.regular
  },
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  profileInfo: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    height: 125,
    marginBottom: 10
  },
  nonButtons: {
    flexDirection: 'column'
  },
  profileInfoTop: {
    padding: 10,
    flexDirection: 'row',
  },
  profileInfoTopLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10
  },
  profileInfoTopRight: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  profileInfoBottom: {
    flexDirection: 'row',
    paddingLeft: 20
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  }
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