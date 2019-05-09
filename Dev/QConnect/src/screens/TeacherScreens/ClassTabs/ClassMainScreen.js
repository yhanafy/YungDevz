import React, { Component } from "react";
import { ScrollView, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import studentImages from "config/studentImages"
import { Font } from 'expo';
import mapStateToCurrentClassProps from 'screens/TeacherScreens/helpers/mapStateToCurrentClassProps'
import QcParentScreen from "screens/QcParentScreen";

export class ClassMainScreen extends QcParentScreen {

  async componentDidMount() {
    super.componentDidMount();
    //This may not be the eventual right approach here.. but this is a current mitigation to the 
    // fact that we get an error about 'regular' font not loaded yet if we redirect to add class or edit class 
    // pages before explicitly loading the fonts. 
    // Todo: figure out a safer way to do this without having to hold the UI until the font is loaded.
    await Font.loadAsync({
      regular: require('assets/fonts/Montserrat-Regular.ttf'),
      light: require('assets/fonts/Montserrat-Light.ttf'),
      bold: require('assets/fonts/Montserrat-Bold.ttf'),
    });

    const { classIndex } = this.props;

    if (classIndex === -1) {
      this.props.navigation.push('AddClass');
    }
  }

  render() {
    const classIndex = this.props.classIndex;

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.props.students}
          keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
          renderItem={({ item, index }) => (
            <StudentCard
              key={index}
              studentName={item.name}
              background={colors.white}
              profilePic={studentImages.images[item.imageId]}
              currentAssignment={item.currentAssignment.name}
              onPress={() =>
                this.props.navigation.push("StudentProfile", {
                  studentIndex: index,
                  classIndex: classIndex
                })
              }
            />
          )}
        />
      </ScrollView>
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
  classTitle: {
    color: colors.primaryDark,
    fontSize: 25
  }
});

const mapStateToProps = (state) => {
  return mapStateToCurrentClassProps(state)
};

export default connect(mapStateToProps)(ClassMainScreen);
