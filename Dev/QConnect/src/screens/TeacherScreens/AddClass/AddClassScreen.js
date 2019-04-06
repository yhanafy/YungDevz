import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import QcActionButton from "components/QcActionButton";
import ImageSelectionModal from "components/ImageSelectionModal"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addClass } from "model/actions/addClass";
import strings from '../../../../config/strings';

export class AddClassScreen extends Component {
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

  // saves the class into redux
  addNewClass() {
    if (this.state.className) {
      let classInfo = {
        name: this.state.className,
        imageId: this.state.classImageId,
        students: []
      };

      this.props.addClass(classInfo);

      //Navigates to the class
      this.props.navigation.push("CurrentClass", {
        classIndex: this.props.classes.length,
        classTitle: this.state.className
      });
    } else {
      alert(strings.PleaseMakeSureToHaveAnInput);
    }
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

              <Text style={{
                fontSize: 15,
                marginTop: 5
              }}>{strings.YourClassNameIs}{this.state.className}</Text>

              <QcActionButton
                text={strings.AddClass}
                onPress={() => {
                  this.addNewClass();
                }}
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
  const { classes } = state.data.teachers[0];
  return { classes };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addClass
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClassScreen);