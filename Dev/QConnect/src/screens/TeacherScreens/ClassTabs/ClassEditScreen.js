import React, { Component } from "react";
import { ScrollView, View, StyleSheet, TextInput, FlatList, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Text, Alert } from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import { bindActionCreators } from "redux";
import { deleteStudent } from "model/actions/deleteStudent";
import { addStudent } from "model/actions/addStudent";
import QcActionButton from "components/QcActionButton";
import ImageSelectionModal from 'components/ImageSelectionModal'
import ImageSelectionRow from 'components/ImageSelectionRow'
import studentImages from "config/studentImages";
import { Icon } from 'react-native-elements';
import strings from "config/strings";
import mapStateToCurrentClassProps from "screens/TeacherScreens/helpers/mapStateToCurrentClassProps";
import QcParentScreen from "screens/QcParentScreen";
import classImages from "config/classImages";
import { addClass } from "model/actions/addClass";
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";


export class ClassEditScreen extends QcParentScreen {
  //----------------------- state -------------------------------------
  state = {
    className: "",
    classImageId: Math.floor(Math.random() * 10),
    modalVisible: false,
  };


  // -------- event handlers, respond to user initiated events ----------
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onImageSelected(imageId) {
    this.setState({ classImageId: imageId })
    this.setModalVisible(false);
  }

  //---- helper function to determine if the entered class name is duplicate -------
  classNameAlreadyExists() {
    let { classes } = this.props;
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].name.toLowerCase() === this.state.className.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  // saves the class into redux
  addNewClass() {
    let { classes } = this.props;

    if (!this.state.className || this.state.className.trim().length === 0) {
      Alert.alert(strings.Whoops, strings.PleaseMakeSureAllFieldsAreFilledOut);
      return;
    }

    if (this.classNameAlreadyExists()) {
      Alert.alert(strings.Whoops,
        /*Message to say that it is an invalid input:*/
        "Class Name already exists!",
        [/*Button to exit */
          { text: "OK" }
        ]
      )
      return;
    }

    let newClassIndex = this.props.classes.length;

    let classInfo = {
      name: this.state.className,
      imageId: this.state.classImageId,
      students: []
    };

    this.props.addClass(classInfo);
    this.props.saveTeacherInfo(
      0, //todo: proper id here..
      { currentClassIndex: newClassIndex }
    );

    //Navigates to the class
    this.props.navigation.push("ClassEdit");
  name = "ClassEditScreen";
    //----------------------- state -------------------------------------
  state = {
    className: "",
    classImageId: Math.floor(Math.random() * 10),
    modalVisible: false,
  };



  //---- helper function to determine if the entered class name is duplicate -------
  classNameAlreadyExists(); {
    let { classes } = this.props;
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].name.toLowerCase() === this.state.className.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  // saves the class into redux
  addNewClass(); {
    let { classes } = this.props;

    if (!this.state.className || this.state.className.trim().length === 0) {
      Alert.alert(strings.Whoops, strings.PleaseMakeSureAllFieldsAreFilledOut);
      return;
    }

    if (this.classNameAlreadyExists()) {
      Alert.alert(strings.Whoops,
        /*Message to say that it is an invalid input:*/
        "Class Name already exists!",
        [/*Button to exit */
          { text: "OK" }
        ]
      )
      return;
    }

    let newClassIndex = this.props.classes.length;

    let classInfo = {
      name: this.state.className,
      imageId: this.state.classImageId,
      students: []
    };

    this.props.addClass(classInfo);
    this.props.saveTeacherInfo(
      0, //todo: proper id here..
      { currentClassIndex: newClassIndex }
    );

    //Navigates to the class
    this.props.navigation.push("ClassEdit");

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

  //Tests whether the entered input is already a student that exists in the given class
  studentNameExists(); {
    const students = this.props.students;
    const input = this.state.newStudentName.trim();

    //Will search if there is a student with the same name or not, if there is, it will return the 
    //index, if there is not, it will return -1.
    const studentIndex = students.findIndex((student) => {
      return student.name === input;
    });

    return studentIndex !== -1;
  }

  // ----------- Redux function to persist the added student ------------------------
  addNewStudent(classIndex); {
    if (!this.state.newStudentName) {
      Alert.alert(strings.Whoops, strings.PleaseInputAName);
    } else if (this.studentNameExists()) {
      Alert.alert(strings.Whoops, strings.ThereIsAlreadyAStudentWithThatName);
    } else {
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
    }

    this.initialDefaultImageId = this.getRandomGenderNeutralImage()

    this.setState({
      profileImageId: this.initialDefaultImageId, 
      highlightedImagesIndices: this.getHighlightedImages()
    })

  }

  // ------- event handlers of when images are selected or being selected ---------
  onImageSelected(index); {
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

  setModalVisible(visible); {
    this.setState({ modalVisible: visible });
  }

  // ------- Render method: Main entry to render the screen's UI ------------------

  render(); {
    const { deleteStudent, addStudent, classIndex, students } = this.props;

    if (this.state.highlightedImagesIndices.length == 0) {
      return false;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View
          style={styles.container}
        >

          <ImageSelectionModal
            visible={this.state.modalVisible}
            images={classImages.images}
            cancelText={strings.Cancel}
            setModalVisible={this.setModalVisible.bind(this)}
            onImageSelected={this.onImageSelected.bind(this)}
            screen={this.name}
          />

          <View style={styles.picContainer}>
            <Image
              style={styles.profilePic}
              source={classImages.images[this.state.classImageId]}
              ResizeMode="contain" />
            <TouchableText
              text={strings.EditClassImage}
              onPress={() => this.setModalVisible(true)} />
          </View>

          <View style={styles.bottomContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholder={strings.WriteClassNameHere}
              onChangeText={classInput =>
                this.setState({
                  className: classInput
                })
              }
            />

            <QcActionButton
              text={strings.AddClass}
              onPress={() => {
                this.addNewClass();
              }}
              screen={this.name}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
        <ScrollView style={styles.container}>
          <ImageSelectionModal
            visible={this.state.modalVisible}
            images={studentImages.images}
            cancelText="Cancel"
            setModalVisible={this.setModalVisible.bind(this)}
            onImageSelected={this.onImageSelected.bind(this)}
            screen={this.name}
          />

          <View ID={classIndex} style={styles.inputContainer}>
            <Text style={styles.inputName}>{strings.EnterYourStudentsName}</Text>
            <TextInput
              placeholder={strings.StudentName}
              onChangeText={newStudentName => this.setState({ newStudentName })}
              value={this.state.newStudentName}
              style={{ paddingBottom: 10 }}
            />
            <ImageSelectionRow
              images={studentImages.images}
              highlightedImagesIndices={this.state.highlightedImagesIndices}
              onImageSelected={this.onImageSelected.bind(this)}
              onShowMore={() => this.setModalVisible(true)}
              selectedImageIndex={this.state.profileImageId}
              screen={this.name}
            />
            <QcActionButton
              text={strings.AddStudent}
              onPress={() => this.addNewStudent(classIndex)}
              screen={this.name}
            />
          </View>
          <FlatList
            data={students}
            keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
            renderItem={({ item, index }) => (
              <StudentCard
                key={index}
                studentName={item.name}
                profilePic={studentImages.images[item.imageId]}
                background={colors.white}
                onPress={() => { }}
                comp={<Icon
                  name='user-times'
                  size={25}
                  type='font-awesome'
                  color={colors.primaryLight}
                  onPress={() => {
                    Alert.alert(
                      'Delete Student',
                      'Are you sure you want to delete this student?',
                      [
                        {
                          text: 'Delete', onPress: () => {
                            deleteStudent(
                              classIndex,
                              index
                            );
                          }
                        },

                        { text: 'Cancel', style: 'cancel' },
                      ]
                    );
                  }}
                />}
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
  },
  inputName: {
    fontFamily: "regular",
    fontSize: 18,
    paddingBottom: 10
  }
});

const mapStateToProps = (state) => {
  return mapStateToCurrentClassProps(state)
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
