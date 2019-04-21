import React, { Component } from "react";
import { ScrollView, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import studentImages from "config/studentImages"

export class ClassMainScreen extends Component {
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

const mapStateToProps = (state, ownProps) => {
  let classIndex = ownProps.navigation.state.params
      ? ownProps.navigation.state.params.classIndex
      : state.data.teachers[0].currentClassIndex;

  let currentClass  = state.data.teachers[0].classes[classIndex];
  return { classIndex, ...currentClass };
};

export default connect(mapStateToProps)(ClassMainScreen);
