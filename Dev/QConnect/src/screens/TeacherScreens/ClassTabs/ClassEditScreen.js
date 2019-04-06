import React, { Component } from "react";
import { ScrollView, View, StyleSheet, TextInput, FlatList, TouchableWithoutFeedback, Keyboard } from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import { bindActionCreators } from "redux";
import { deleteStudent } from "model/actions/deleteStudent";
import { addStudent } from "model/actions/addStudent";
import QcActionButton from "components/QcActionButton";
import studentImages from "config/studentImages";
import strings from "../../../../config/strings";

export class ClassEditScreen extends Component {
  // ---------- Helpers to initialize random suggested student images --------------
  //  2 gender neutral images, one female, and one male
  // -------------------------------------------------------------------------------
  getRandomGenderNeutralImage = () => {
    index = Math.floor(Math.random() * Math.floor(studentImages.genderNeutralImages.length));
    imageIndex = studentImages.genderNeutralImages[index];
    return imageIndex;
  }

  getRandomMaleImage = () => {
    index = Math.floor(Math.random() * Math.floor(studentImages.maleImages.length));
    imageIndex = studentImages.maleImages[index];
    return imageIndex;
  }

  getRandomFemaleImage = () => {
    index = Math.floor(Math.random() * Math.floor(studentImages.femaleImages.length));
    imageIndex = studentImages.femaleImages[index];
    return imageIndex;
  }

  initialDefaultImageId = this.getRandomGenderNeutralImage()

  getHighlightedImages = () => {
    defaultImageId = this.initialDefaultImageId;

    // get a second gender neutral image, make sure it is different than the first one
    do {
      secondGenericImageId = this.getRandomGenderNeutralImage();
    } while (secondGenericImageId === defaultImageId)

    //initialize the array of suggested images
    let proposedImages = [defaultImageId, secondGenericImageId, this.getRandomFemaleImage(), this.getRandomMaleImage()]
    return proposedImages;
  }

  state = {
    newStudentName: "",
    modalVisible: false,
    profileImageId: this.initialDefaultImageId,
    highlightedImagesIndices: this.getHighlightedImages(),
  }

  // ----------- Redux function to persist the added student ------------------------
  addNewStudent(classIndex) {
    if (this.state.newStudentName) {
      this.props.addStudent({
        classIndex: classIndex,
        studentInfo: {
          name: this.state.newStudentName,
          totalAssignments: 0,
          totalGrade: 0,
          imageId: this.state.profileImageId,
          currentAssignment: {
            name: "None",
            startDate: ""
          },
          assignmentHistory: [],
          attendanceHistory: []
        }
      });
      this.refs.toast.show(this.state.newStudentName + strings.IsNowAddedToTheClass,
        DURATION.LENGTH_SHORT);
      this.setState({ newStudentName: "" });
    } else {
      alert(strings.PleaseInputAName)
    }
  }

  // ------- event handlers of when images are selected or being selected ---------
  onImageSelected(index) {
    let candidateImages = this.state.highlightedImagesIndices;

    if (!this.state.highlightedImagesIndices.includes(index)) {
      candidateImages.splice(0, 1);
      candidateImages.splice(0, 0, index);
    }

    this.setState({
      profileImageId: index,
      highlightedImagesIndices: candidateImages
    })

    this.setModalVisible(false);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // ------- Render method: Main entry to render the screen's UI ------------------

  render() {
    const { params } = this.props.navigation.state;
    const { deleteStudent, addStudent, classes } = this.props;

    classIndex = params && params.classIndex ? params.classIndex : 0;

    if (this.state.highlightedImagesIndices.length == 0) {
      return false;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.container}>
          <ImageSelectionModal
            visible={this.state.modalVisible}
            images={studentImages.images}
            cancelText="Cancel"
            setModalVisible={this.setModalVisible.bind(this)}
            onImageSelected={this.onImageSelected.bind(this)}
          />

          <View ID={classIndex} style={styles.inputContainer}>
            <TextInput
              placeholder={strings.EnterNewStudentsName}
              onChangeText={newStudentName => this.setState({ newStudentName })}
              value={this.state.newStudentName}
            />
            <ImageSelectionRow
              images={studentImages.images}
              highlightedImagesIndices={this.state.highlightedImagesIndices}
              onImageSelected={this.onImageSelected.bind(this)}
              onShowMore={() => this.setModalVisible(true)}
              selectedImageIndex={this.state.profileImageId}
            />
            <QcActionButton
              text={strings.AddStudent}
              onPress={() => this.addNewStudent(classIndex)}
            />
          </View>
          <FlatList
            data={classes[classIndex].students}
            keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
            renderItem={({ item, index }) => (
              <StudentCard
                key={index}
                studentName={item.name}
                profilePic={studentImages.images[item.imageId]}
                background={colors.white}
                onPress={() =>
                  deleteStudent(
                    classIndex,
                    index
                  )
                }
              />
            )}
          />
          <Toast ref="toast" />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  inputContainer: {
    flexDirection: "column",
    backgroundColor: colors.white,
    padding: 10,
    paddingTop: 20,
    flex: 1
  },
  classTitle: {
    color: colors.primaryDark,
    fontSize: 25
  }
});

const mapStateToProps = state => {
  const { classes } = state.data.teachers[0];
  return { classes };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteStudent,
      addStudent
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassEditScreen);
