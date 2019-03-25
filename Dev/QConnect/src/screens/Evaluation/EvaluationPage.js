import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';
import colors from 'config/colors';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

class EvaluationPage extends Component {

  render() {
    return (

      <View
        style={styles.container}>
        <View
          style={styles.evaluationContainer}>
          <Text>Student Evaluation: {this.props.name}</Text>
          <Rating
            showRating
            onFinishRating={this.ratingCompleted}
            style={{
              paddingVertical: 10,
              backgroundColor: colors.lightGrey,

            }}
          />
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.lightGrey,
    flex: 1,
    justifyContent: "flex-end"
  },
  evaluationContainer: {
    paddingTop: 25,
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
    flex: 1
  },
});

const mapStateToProps = (state, ownProps) => {
  const {classIndex, studentIndex} = ownProps.navigation.state.params;
  state = state.data.teachers[0].classes[classIndex].students[studentIndex];
  return state;
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationPage);