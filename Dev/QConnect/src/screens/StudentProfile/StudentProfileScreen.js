import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import colors from 'config/colors';
import QcActionButton from "components/QcActionButton"
import { Rating } from 'react-native-elements';
import { connect } from "react-redux";

class StudentProfileScreen extends Component {

  //Method retrieves the current average rating for the current student
  getAverageRating() {

  }

  render() {
    const { navigate } = this.props.navigation;
    const { classIndex, studentIndex } = this.props.navigation.state.params;
    const currentStudent = this.props.classes[classIndex].students[studentIndex];
    const rating = 5.0;

    return (
      <View style={styles.container}>
        <View style={styles.profileInfo}>

            <View style={styles.profileInfoTop}>
              <View style={styles.profileInfoTopLeft}>
                <Image source={{ uri: currentStudent.avatar }}
                  style={styles.profilePic} />
              </View>
              <View style={styles.profileInfoTopRight}>
                <Text style={{ fontSize: 24 }}>{currentStudent.name}</Text>
                <Rating readonly={true} startingValue={rating} imageSize={25} />
                <Text style={{ fontSize: 14 }}>{rating >= 3 ? 'Outstanding!' : 'Needs Work'}</Text>
              </View>
            </View>

            <View style={styles.profileInfoBottom}>
              <Text style={{ fontSize: 14 }}>{'Current Assignment: ' + currentStudent.assignment}</Text>
            </View>

        </View>

        <View style={styles.buttons}>
              <QcActionButton text='Add Assignment' onPress={() => 
                //to-do: Make it possible to add assignment
                {}}/>
              <QcActionButton text='Grade Assignment' onPress={() => 
                this.props.navigation.push("EvaluationPage", {
                  studentIndex: studentIndex,
                  classIndex: classIndex
                })} />
        </View>

        <View style={styles.prevAssignments}>

        </View>
      </View>
    );
  }
};

//styles for the entire page
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  profileInfo: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    height: 125
  },
  nonButtons: {
    flexDirection: 'column'
  },
  profileInfoTop: {
    padding: 10,
    flexDirection: 'row',
  },
  profileInfoTopLeft: {
    flexDirection: 'column'
  },
  profileInfoTopRight: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  profileInfoBottom: {
    flexDirection: 'row',
    paddingLeft: 20
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    marginLeft: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  prevAssignments: {

  }
});

const mapStateToProps = state => {
  const { classes } = state.data.teachers[0];
  return { classes };
};

export default connect(mapStateToProps)(StudentProfileScreen);