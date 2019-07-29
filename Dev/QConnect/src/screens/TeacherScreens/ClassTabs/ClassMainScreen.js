import React from "react";
import { ScrollView, StyleSheet, FlatList, View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import studentImages from "config/studentImages"
import LoadingSpinner from '../../../components/LoadingSpinner';
import { Font } from 'expo';
import strings from 'config/strings';
import mapStateToCurrentClassProps from 'screens/TeacherScreens/helpers/mapStateToCurrentClassProps'
import QcParentScreen from "screens/QcParentScreen";
import QcActionButton from "components/QcActionButton"

export class ClassMainScreen extends QcParentScreen {

  name = "ClassMainScreen";

  async componentDidMount() {
    super.componentDidMount();
    //This may not be the eventual right approach here.. but this is a current mitigation to the 
    // fact that we get an error about 'regular' font not loaded yet if we redirect to add class or edit class 
    // pages before explicitly loading the fonts. 
    // Todo: figure out a safer way to do this without having to hold the UI until the font is loaded.

    // await Font.loadAsync({
    //   regular: require('assets/fonts/Montserrat-Regular.ttf'),
    //   light: require('assets/fonts/Montserrat-Light.ttf'),
    //   bold: require('assets/fonts/Montserrat-Bold.ttf'),
    // });


    const { classId } = this.props;

    if (classId === -1) {
      this.props.navigation.push('AddClass');
    }
  }

  render() {
    const classId = this.props.classId;
    if (this.state.fontLoaded === false) {
      return (
        <View style={styles.container}>
          <LoadingSpinner isVisible={true} />
        </View>
      )
    }
    else if (this.props.students.length === 0) {
      /**
       * ------Overview:
       * The Page will display a message that will redirect the teacher to the 
       * add student page if the class does not contain any students.
       * 
       * ------Components:
       * We are using a touchable opacity with a large message telling the
       * teacher that there are no students in the class, and a smaller message
       * telling the teacher to click the text to add students.
       * 
       * ------Conditonal:
       * The conditional will check to see if the length of the students array is 0,
       * if it is, then there is no students in the class, and thus the class is empty,
       * triggering the message. */
      return (
        <View
          style={[styles.container, { alignItems: "center" }, { justifyContent: "center" }]}>



          <Image
            source={require('assets/emptyStateIdeas/ghostGif.gif')}
            style={{
              width: 300,
              height: 150,
              resizeMode: 'contain',
            }}
          />

          <Text
            style={{
              fontSize: 30,
              color: colors.primaryDark,
              flexDirection: "row",
            }}
          >
            Uh Oh! No students!
              </Text>

          <QcActionButton
            text={"Click on Me to Add A Student"}
            onPress={() => this.props.navigation("ClassEditScreen")} />
        </View>
      )
    }


    else {

      return (
        <ScrollView style={styles.container}>
          <FlatList
            data={this.props.students}
            keyExtractor={(item) => item.name} // fix, should be item.id (add id to classes)
            renderItem={({ item }) => (
              <StudentCard
                key={item.id}
                studentName={item.name}
                background={colors.white}
                profilePic={studentImages.images[item.imageId]}
                currentAssignment={this.props.currentAssignments.byStudentId[item.id][0].name}
                onPress={() =>
                  this.props.navigation.push("StudentProfile", {
                    studentId: item.id,
                    classId: classId
                  })
                }
              />
            )}
          />
        </ScrollView>
      );
    }

  }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 3
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
