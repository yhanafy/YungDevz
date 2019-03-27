import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Image, FlatList, KeyboardAvoidingView } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';
import colors from 'config/colors';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import QcActionButton from 'components/QcActionButton'

export class EvaluationPage extends Component {

  render() {
    const subjects = ["Memorization", "Makharej", "Edgham & Ekhfae", "Rulings of Raa'", "Muduud", "Qalqalah"]

    return (
      //----- outer view, gray background ------------------------
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

        <View style={styles.evaluationContainer}>
          <View style={styles.section}>
            <Image source={{ uri: this.props.avatar }}
              style={styles.profilePic} />
            <Text style={styles.titleText}>{this.props.name}</Text>
            <Text style={styles.subTitleText}>{this.props.currentAssignment.name}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.mainQuestionText}>How was {this.props.name}'s tasmee'?</Text>
            <AirbnbRating
              defaultRating={0}
              size={30}
              showRating={false}
            />

            <FlatList
              numColumns={2}
              data={subjects}
              keyExtractor={(item, index) => index} // fix, should be item.id (add id to classes)
              renderItem={({ item, index }) => (
                <View style={styles.box}>
                  <Text style={styles.subCategoryText}>{item}</Text>
                  <Rating
                    startingValue={0}
                    type="custom"
                    imageSize={25}
                    ratingColor={colors.primaryLight}
                    showRating={false}
                  />
                </View>
              )} />

            <TextInput
              style={styles.notesStyle}
              multiline={true}
              numberOfLines={3}
              placeholder="Write a note."
              placeholderColor={colors.black}
            />
          </View>

        </View>

        <View style={styles.buttonsContainer}>
          <QcActionButton
            text="Submit"
            onPress={() => { }}
          />
        </View>

      </KeyboardAvoidingView>

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
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    flex: 1,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    justifyContent: "flex-end"
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    alignItems: "center",
    alignSelf: 'stretch',
    padding: 10
  },
  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 35,
    marginTop: -65,
    marginLeft: 10,
    borderColor: colors.white,
    borderWidth: 3
  },
  titleText: {
    color: colors.darkGrey,
    fontSize: 20
  },
  subTitleText: {
    color: colors.primaryDark,
    fontSize: 18
  },
  mainQuestionText: {
    color: colors.darkGrey,
    fontSize: 16,
    marginBottom: 10
  },
  box: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignItems: "center",
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  subCategoryText: {
    color: colors.darkGrey,
    fontSize: 16,
    paddingBottom: 7
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  notesStyle: {
    backgroundColor: colors.lightGrey,
    alignSelf: 'stretch',
    margin: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlignVertical: 'top'
  }
});

const mapStateToProps = (state, ownProps) => {
  const { classIndex, studentIndex } = ownProps.navigation.state.params;
  state = state.data.teachers[0].classes[classIndex].students[studentIndex];
  return state;
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationPage);