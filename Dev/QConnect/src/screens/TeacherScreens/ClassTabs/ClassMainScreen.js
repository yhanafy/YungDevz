import React, { Component } from "react";
import { ScrollView, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import studentImages from "config/studentImages"

export class ClassMainScreen extends Component {
  render() {
    classIndex = this.props.navigation.state.params
      ? this.props.navigation.state.params.classIndex
      : 0;

    return (
      /*
      this.props.classes.length === 0 ? this.props.navigation.push('AddClass') :
      this.props.classes[classIndex].students.length === 0 ? this.props.navigation.push('ClassEdit') :
      */
      <ScrollView style={styles.container}>
        <FlatList
          data={this.props.classes[classIndex].students}
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

const mapStateToProps = state => {
  const { classes } = state.data.teachers[0];
  return { classes };
};

export default connect(mapStateToProps)(ClassMainScreen);
