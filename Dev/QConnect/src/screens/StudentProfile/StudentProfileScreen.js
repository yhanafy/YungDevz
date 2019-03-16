import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import colors from "config/colors";
import { connect } from "react-redux";

class StudentProfileScreen extends Component {

    //Method retrieves the current average rating for the current student
    getAverageRating() {

    }

    render() {
        const { navigate } = this.props.navigation;
        const { classIndex, studentIndex } = this.props.navigation.state.params;
        const currentStudent = this.props.classes[classIndex].students[studentIndex];

        return (
          <View style={styles.container}>
            <View style={styles.profileInfo}>
              <Image source={{uri : currentStudent.avatar}} 
              style={styles.profilePic}
              />
              <Text>{currentStudent.name}</Text>
            </View>
            <View style={styles.buttons}>
            
            </View>
            <View style={styles.prevAssignments}>
            
            </View>
          </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  profileInfo: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 125
  },
  profilePic: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginTop: 20, 
    marginLeft: 15
  },
  buttons: {

  },
  prevAssignments: {
    
  }
});

const mapStateToProps = state => {
  const { classes } = state.data.teachers[0];
  return { classes };
};

export default connect(mapStateToProps)(StudentProfileScreen);