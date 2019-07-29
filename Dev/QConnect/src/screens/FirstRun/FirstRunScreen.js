import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import QcActionButton from "components/QcActionButton";
import QcAppBanner from "components/QcAppBanner";
import strings from "../../../config/strings";
import QcParentScreen from "screens/QcParentScreen";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("assets/images/read_child_bg.jpg");

class FirstRunScreen extends QcParentScreen {
  name = "FirstRunScreen";

  onTeacherFlow = () => {
    //todo: get the first class to show from redux persist (current class)
    this.props.navigation.push('LoginScreen');
  }

  //Navigates to the student side
  onStudentFlow = () => {
    //todo: Change this to a login so that the correct student can be displayed
    this.props.navigation.push('StudentMenu');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={{ flex: 3 }} />
          <QcAppBanner />
          <View style={styles.spacer} />
          <View style={{ flex: 1 }}>
            <QcActionButton
              navigation={navigation}
              text={strings.IAmATeacher}
              onPress={this.onTeacherFlow}
              screen={this.name}
            />
            <View style={{ flex: 1 }}/>
            <QcActionButton
              navigation={navigation}
              text={strings.IAmAStudent}
              onPress={this.onStudentFlow}
              screen={this.name}
            />
          </View>
          <View style={{ flex: 1 }} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spacer: {
    flex: 3
  },
  bgImage: {
    flex: 5,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FirstRunScreen;
