import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import colors from 'config/colors';
import QcActionButton from "components/QcActionButton"
import { Rating } from 'react-native-elements';
import fonts from 'config/colors';
import DialogInput from 'react-native-dialog-input';
import { editCurrentAssignment } from 'model/actions/editCurrentAssignment';
import { addNewAssignment } from 'model/actions/addNewAssignment';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import strings from '../../../config/strings';

class StudentProfileScreen extends Component {

  state = {
    isDialogVisible: false,
    averageGrade: 0 
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
          title={strings.EditAssignment}
          hintInput={strings.EnterAssignmentHere}
          dialogStyle={{marginBottom: 100}}
          submitInput={(inputText) => 
            //If the student already has an existing assignment, then it will simply edit the
            //name of the current assignment, if not, then it will create a new assignment
            { hasCurrentAssignment ? this.editAssignment(classIndex, studentIndex, 
              {name: inputText, startDate: new Date().toLocaleDateString("en-US")})
               : this.addAssignment(classIndex, studentIndex, inputText)}}
          closeDialog={() => { this.setState({ isDialogVisible: false }) }} />

        <View style={styles.profileInfo}>

          <View style={styles.profileInfoTop}>
            <View style={styles.profileInfoTopLeft}>
              <Image source={{ uri: currentStudent.avatar }}
                style={styles.profilePic} />
            </View>
            <View style={styles.profileInfoTopRight}>
              <Text style={styles.bigText}>{currentStudent.name}</Text>
              <Rating readonly={true} startingValue={averageRating} imageSize={25} />
              <Text style={styles.subText}>{averageRating >= 3 ? strings.OutStanding : strings.NeedsWork}</Text>
            </View>
          </View>

          <View style={styles.profileInfoBottom}>
            <Text style={styles.subText}>{strings.CurrentAssignment + currentStudent.currentAssignment.name}</Text>
          </View>

        </View>

        <View style={styles.buttons}>
          <QcActionButton text={hasCurrentAssignment ? strings.EditAssignment : strings.AddAssignment} 
          onPress={() => { this.setState({ isDialogVisible: true }) }} />
          <QcActionButton text={strings.GradeAssignment} onPress={() =>
            this.props.navigation.push("EvaluationPage", {
              studentIndex: studentIndex,
              classIndex: classIndex
            })} />
        </View>

        <ScrollView style={styles.prevAssignments}>
          <FlatList
            data={currentStudent.assignmentHistory}
            keyExtractor={(item, index) => item.name}
            renderItem={({ item, index }) => (
              <View style={styles.prevAssignmentCard} key={index}>
                <View style={{alignItems: 'center', paddingTop: 10}}>
                  <Text style={styles.prevAssignmentTitleText}>{item.name}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={[styles.subText, {paddingLeft: 10}]}>{item.completionDate}</Text>
                  <Rating style={{paddingRight: 10}} readonly={true} 
                  startingValue={item.evaluation.overallGrade} imageSize={17} />
                </View> 
                <View style={{padding: 10}}>
                  <Text style={styles.subText}>{"Notes: " + item.evaluation.notes}</Text>
                </View> 
              </View>
            )}
            />
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
  prevAssignmentTitleText: {
    fontFamily: fonts.regular,
    fontSize: 19
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
    flexDirection: 'column'
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
    marginTop: 10,
    marginLeft: 10
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
    borderColor: colors.lightGrey,
    borderWidth: 0.5,
    height: 100,
    justifyContent: 'space-between'
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