import React from 'react'
import { StyleSheet, View, Text, TextInput, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { AirbnbRating } from 'react-native-elements';
import colors from 'config/colors';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import QcActionButton from 'components/QcActionButton';
import { completeCurrentAssignment } from 'model/actions/completeCurrentAssignment';
import { editCurrentAssignment } from 'model/actions/editCurrentAssignment';
import strings from 'config/strings';
import studentImages from 'config/studentImages';
import QcParentScreen from 'screens/QcParentScreen';
import FlowLayout from 'components/FlowLayout'

export class EvaluationPage extends QcParentScreen {

  name = "EvaluationPage";

  // -------------  Current evaluation state ---------------------
  state = {
    overallGrade: 0,
    notes: "",
    improvementAreas: []
  }

  areas = [strings.Memorization, strings.Makharej, strings.Edgham, strings.Ekhfae, strings.RulingsOfRaa, strings.Muduud, strings.Qalqalah]

  // --------------  Updates state to reflect a change in a category rating --------------
  updateCategoryRating = (name, rating) => {

    this.setState({
      overallGrade: this.state.overallGrade,
      improvementAreas: categoriesGrades,
      notes: this.state.notes
    })
  }

  //----- Saves the rating to db and pops to previous view ---------
  doSubmitRating(classIndex, studentIndex) {
    this.props.completeCurrentAssignment(classIndex, studentIndex, this.state);

    // keep the assignment name as the last assignment to reduce retype since most of the times the next assignment would be the same surah (next portion) or a redo.
    // todo: eventually right after grading we should have a step for the teacher to update the next assignment
    this.props.editCurrentAssignment(classIndex, studentIndex, { name: this.props.currentAssignment.name, startDate: "" });
    this.props.navigation.pop();
  }

  //------------  Ensures a rating is inputted before submitting it -------
  submitRating(classIndex, studentIndex) {
    if (this.state.overallGrade === 0) {
      Alert.alert(
        'No Rating',
        strings.AreYouSureYouWantToProceed,
        [
          {
            text: 'Yes', style: 'cancel', onPress: () => {
              this.doSubmitRating(classIndex, studentIndex)
            }
          },
          { text: 'No', style: 'cancel' }
        ]
      );
    } else {
      this.doSubmitRating(classIndex, studentIndex);
    }
  }

  // --------------  Renders Evaluation scree UI --------------
  render() {
    const { classIndex, studentIndex } = this.props.navigation.state.params;
    const { imageId } = this.props;

    return (
      //----- outer view, gray background ------------------------
      //Makes it so keyboard is dismissed when clicked somewhere else
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding">

          <View style={styles.evaluationContainer}>
            <View style={styles.section}>
              <Image source={studentImages.images[imageId]}
                style={styles.profilePic} />
              <Text style={styles.titleText}>{this.props.name}</Text>
              <Text style={styles.subTitleText}>{this.props.currentAssignment.name}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.mainQuestionText}>{strings.HowWas}{this.props.name}{strings.sTasmee3}</Text>
              <View style={{ paddingVertical: 15 }}>
                <AirbnbRating
                  defaultRating={0}
                  size={30}
                  showRating={false}
                  onFinishRating={(value) => this.setState({
                    overallGrade: value
                  })}
                />
              </View>

              <TextInput
                style={styles.notesStyle}
                multiline={true}
                height={100}
                onChangeText={(notes) => this.setState({
                  notes: notes
                })}
                placeholder={strings.WriteANote}
                placeholderColor={colors.black}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text style={[{ flex: 1 }, styles.subCategoryText]}>{strings.improvementAreas}</Text>
              </View>
              <FlowLayout ref="flow"
                dataValue={this.categories}
                title="Improvement Areas"
                onSelectionChanged={(improvementAreas) => this.setState({ improvementAreas: improvementAreas })}
              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <QcActionButton
              text={strings.Submit}
              onPress={() => { this.submitRating(classIndex, studentIndex) }}
              screen={this.name}
            />
          </View>
          <View style={styles.filler}></View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

    )
  }
}

//--------------- Styles used on this screen -------------------
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.lightGrey,
    flex: 1,
    justifyContent: "flex-end"
  },
  evaluationContainer: {
    flexDirection: 'column',
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
  },
  section: {
    alignItems: "center",
    alignSelf: 'stretch',
    padding: 10
  },
  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 35,
    marginTop: -65,
    marginLeft: 10,
    borderColor: colors.white,
    borderWidth: 3
  },
  titleText: {
    color: colors.darkGrey,
    fontSize: 20
  },
  subTitleText: {
    color: colors.primaryDark,
    fontSize: 18
  },
  mainQuestionText: {
    color: colors.darkGrey,
    fontSize: 16,
    marginBottom: 10
  },
  box: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignItems: "center",
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  subCategoryText: {
    color: colors.darkGrey,
    fontSize: 16,
    paddingVertical: 4
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  notesStyle: {
    backgroundColor: colors.lightGrey,
    alignSelf: 'stretch',
    margin: 5,
    textAlignVertical: 'top'
  },
  filler: {
    flexDirection: 'column',
    flex: 1
  }
});

// ------------ Redux hook up --------------------------------

const mapStateToProps = (state, ownProps) => {
  const { classIndex, studentIndex } = ownProps.navigation.state.params;
  state = state.data.teachers[0].classes[classIndex].students[studentIndex];
  return state;
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    completeCurrentAssignment,
    editCurrentAssignment
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationPage);