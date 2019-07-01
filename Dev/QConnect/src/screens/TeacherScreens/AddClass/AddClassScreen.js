import React from "react";
import { View, TextInput, Image, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import QcActionButton from "components/QcActionButton";
import QcParentScreen from "screens/QcParentScreen";
import ImageSelectionModal from "components/ImageSelectionModal"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addClass } from "model/actions/addClass";
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";
import strings from 'config/strings';

export class AddClassScreen extends QcParentScreen {
  name = "AddClassScreen";

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

    //todo: this should be in the reducer??
    var nanoid = require('nanoid/non-secure')
    let newId = nanoid()
    classInfo = {id: newId, ...classInfo};

    this.props.addClass(classInfo);
    this.props.saveTeacherInfo(
      { currentClassId: newId }
    );

    //Navigates to the class
    this.props.navigation.push("ClassEdit");
  }

  // ------------ renders the UI of the screen ---------------------------
  render() {
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
      </TouchableWithoutFeedback>
    );
  }
}

//Styles for the Teacher profile class
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.lightGrey,
    flex: 1,
  },
  picContainer: {
    paddingTop: 25,
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  bottomContainer: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    flex: 1
  },
  textInputStyle: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.darkGrey,
    width: 250,
    height: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }

}
);
const mapStateToProps = state => {
  const { classes } = state.data;
  return { classes };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addClass,
      saveTeacherInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClassScreen);