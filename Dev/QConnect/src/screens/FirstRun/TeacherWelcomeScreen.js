import React from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Alert, Modal } from "react-native";
import QcActionButton from "components/QcActionButton";
import Toast, { DURATION } from "react-native-easy-toast";
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";
import { setFirstRunCompleted } from "model/actions/setFirstRunCompleted";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import colors from "config/colors";
import ImageSelectionRow from "components/ImageSelectionRow";
import ImageSelectionModal from "components/ImageSelectionModal";
import TeacherInfoEntries from "components/TeacherInfoEntries";
import teacherImages from "config/teacherImages";
import strings from "config/strings";
import QcParentScreen from "screens/QcParentScreen";
import FadeInView from "../../components/FadeInView";
import Auth from '@aws-amplify/auth';
import { createUser, confirmUserSignUp } from 'model/actions/authActions'
import { Input, Button } from 'react-native-elements'

const initialState = {
  password: '',
  emailAddress: '',
  phoneNumber: '',
  authCode: ''
}

//To-Do: All info in this class is static, still needs to be hooked up to data base in order
//to function dynamically
export class TeacherWelcomeScreen extends QcParentScreen {
  state = initialState

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signUp(username, password, email, phone_number ) {
    console.log("calling create User: " + username + " - " + "password: " + password);
    console.log("about to call actiion: " + JSON.stringify({ username, password, email, phone_number }))
    this.props.createUser(username, password, email, phone_number)
  }

  confirm() {
    const { authCode, emailAddress } = this.state
    this.props.confirmUserSignUp(emailAddress, authCode)
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { showSignUpConfirmationModal } } = nextProps
    if (!showSignUpConfirmationModal && this.props.auth.showSignUpConfirmationModal) {
      this.setState(initialState)
    }
  }

  name = "TeacherWelcomeScreen";

  getRandomGenderNeutralImage = () => {
    index = Math.floor(Math.random() * Math.floor(teacherImages.genderNeutralImages.length));
    imageIndex = teacherImages.genderNeutralImages[index];
    return imageIndex;
  }

  getRandomMaleImage = () => {
    index = Math.floor(Math.random() * Math.floor(teacherImages.maleImages.length));
    imageIndex = teacherImages.maleImages[index];
    return imageIndex;
  }

  getRandomFemaleImage = () => {
    index = Math.floor(Math.random() * Math.floor(teacherImages.femaleImages.length));
    imageIndex = teacherImages.femaleImages[index];
    return imageIndex;
  }

  initialDefaultImageId = this.getRandomGenderNeutralImage()

  getHighlightedImages = () => {
    defaultImageId = this.initialDefaultImageId;

    // get a second gender neutral image, make sure it is different than the first one
    do {
      secondGenericImageId = this.getRandomGenderNeutralImage();
    } while (secondGenericImageId === defaultImageId)

    //initialize the array of suggested images
    let proposedImages = [defaultImageId, secondGenericImageId, this.getRandomFemaleImage(), this.getRandomMaleImage()]
    return proposedImages;
  }

  //--- state captures the inputted user info ------------------
  state = {
    phoneNumber: this.props.phoneNumber === undefined? "" : this.props.phoneNumber,
    emailAddress: this.props.emailAddress === undefined? "" : this.props.emailAddress,
    name: this.props.name === undefined? "" : this.props.name,
    modalVisible: false,
    profileImageId: this.initialDefaultImageId,
    highlightedImagesIndices: this.getHighlightedImages()
  };

  // signUp = (username, password, email, phone_number) => {
  //   console.log("inside signup.... " + username, password);

  //   Auth.signUp({
  //     username: this.state.email,
  //     password,
  //     attributes: {
  //       email,          // optional
  //       phone_number
  //     },
  //     validationData: []  //optional
  //   })
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
  // }

  //this method saves the new profile information to the redux database
  saveNewTeacherInfo = () => {
    const { name, phoneNumber, emailAddress } = this.state;

    if (name.trim() === "" || phoneNumber.trim() === "" || emailAddress.trim() === "") {
      alert(strings.PleaseMakeSureAllFieldsAreFilledOut);
    } else {
      // trick to remove modalVisible and hilightedImagesIndices from state and pass in everything else
      const { modalVisible, highlightedImagesIndices, ...params } = this.state;

      //generate a new id for the new teacher
      var nanoid = require('nanoid/non-secure')
      let id = nanoid()

      // save the relevant teacher properties
      this.props.saveTeacherInfo(
        { id, ...params }
      );

      this.props.setFirstRunCompleted(true);

      this.refs.toast.show(strings.YourProfileHasBeenSaved, DURATION.LENGTH_SHORT);
      this.onTeacherFlow();
    }
  }

  //--- event handlers, handle user interaction ------------------
  setModalVisible(isModalVisible) {
    this.setState({ modalVisible: isModalVisible });
  }

  onImageSelected(index) {
    let candidateImages = this.state.highlightedImagesIndices;

    if (!this.state.highlightedImagesIndices.includes(index)) {
      candidateImages.splice(0, 1);
      candidateImages.splice(0, 0, index);
    }

    this.setState({
      profileImageId: index,
      highlightedImagesIndices: candidateImages
    });

    this.setModalVisible(false);
  }

  onTeacherFlow = () => {
    //todo: get the first class to show from redux persist (current class)
    this.props.navigation.push("AddClass");
  };

  //this method saves the new profile information to the redux database
  saveProfileInfo = teacherID => {
    const { name, phoneNumber, emailAddress, password } = this.state;
    if (
      name.trim() === "" ||
      phoneNumber.trim() === "" ||
      emailAddress.trim() === ""
    ) {
      Alert.alert(strings.Whoops, strings.PleaseMakeSureAllFieldsAreFilledOut);
    } else {
      // trick to remove modalVisible and hilightedImagesIndices from state and pass in everything else
      const { modalVisible, highlightedImagesIndices, ...params } = this.state;

      this.signUp(emailAddress, password, emailAddress, phoneNumber);

      // save the relevant teacher properties
      this.props.saveTeacherInfo(teacherID, params);

      this.props.setFirstRunCompleted(true);

      this.refs.toast.show(
        strings.YourProfileHasBeenSaved,
        DURATION.LENGTH_SHORT
      );
      this.onTeacherFlow();
    }
  };

  //------ event handlers to capture user input into state as user modifies the entries -----
  onNameChanged = value => {
    this.setState({ name: value });
  };

  onPhoneNumberChanged = value => {
    this.setState({ phoneNumber: value });
  };

  onEmailAddressChanged = value => {
    this.setState({ emailAddress: value });
  };
  onPasswordChanged = value => {
    this.setState({ password: value })
  }

  //---------- render method ---------------------------------
  // The following custom components are used below:
  // -    ImageSelectionModal: implements the pop up modal to allow users to customize their avatar
  // -    TeacherInfoEntries: contains entries to capture user info (name, email, and phone number)
  // -    ImageSelectionRow: a row with suggested avatars, and a button to invoke the pop up with more avatars
  //-----------------------------------------------------------
  render() {
    const { auth: {
      showSignUpConfirmationModal,
      isAuthenticating,
      signUpError,
      signUpErrorMessage
    } } = this.props

    console.log(this.props);

    return (
      //Random image appears, still need to hook up database, see to-do above
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <ImageSelectionModal
              visible={this.state.modalVisible}
              images={teacherImages.images}
              cancelText={strings.Cancel}
              setModalVisible={this.setModalVisible.bind(this)}
              onImageSelected={this.onImageSelected.bind(this)}
              screen={this.name}
            />

            <View style={styles.picContainer}>
              <FadeInView
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={styles.welcomeImage}
                  source={require("assets/images/salam.png")}
                />
                <Text style={styles.quote}>{strings.TeacherWelcomeMessage}</Text>
              </FadeInView>

            </View>
            <View style={styles.editInfo} behavior="padding">
              <TeacherInfoEntries
                name={this.state.name}
                phoneNumber={this.state.phoneNumber}
                emailAddress={this.state.emailAddress}
                password={this.state.password}
                onNameChanged={this.onNameChanged}
                onPhoneNumberChanged={this.onPhoneNumberChanged}
                onEmailAddressChanged={this.onEmailAddressChanged}
                onPasswordChanged={this.onPasswordChanged}
              />
              <ImageSelectionRow
                images={teacherImages.images}
                highlightedImagesIndices={this.state.highlightedImagesIndices}
                onImageSelected={this.onImageSelected.bind(this)}
                onShowMore={() => this.setModalVisible(true)}
                selectedImageIndex={this.state.profileImageId}
                screen={this.name}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <QcActionButton
                text={strings.CreateAccount}
                //onPress={() => this.saveProfileInfo(0)} //to-do: Make sure that teacher ID
                onPress={this.saveProfileInfo.bind(this)}
                isLoading={isAuthenticating}
                //is passed instead of 0
                screen={this.name}
              />
            </View>
            <View style={styles.filler} />
            <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
            <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text>
            {
              showSignUpConfirmationModal && (
                <Modal>
                  <View style={styles.modal}>
                    <Input
                      placeholder="Authorization Code"
                      type='authCode'
                      keyboardType='numeric'
                      onChangeText={this.onChangeText}
                      value={this.state.authCode}
                      keyboardType='numeric'
                    />
                    <Button
                      title='Confirm'
                      onPress={this.confirm.bind(this)}
                      isLoading={isAuthenticating}
                    />
                  </View>
                </Modal>
              )
            }
            <Toast ref="toast" />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

//-----------------   Styles for the Teacher profile class-----------------------------------
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1,
    justifyContent: "flex-end"
  },
  picContainer: {
    paddingTop: 10,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: colors.white
  },
  quote: {
    fontSize: 16,
    paddingLeft: 20,
    fontStyle: "italic",
    paddingBottom: 10,
    color: colors.darkGrey
  },
  welcomeImage: {
    marginTop: 15,
    width: 180,
    resizeMode: "contain"
  },
  editInfo: {
    flexDirection: "column",
    backgroundColor: colors.white,
    color: colors.darkGrey
  },
  buttonsContainer: {
    flexDirection: "column",
    marginTop: 10,
    backgroundColor: colors.white,
    justifyContent: "center"
  },
  filler: {
    flexDirection: "column",
    flex: 1
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  }
});

//-------------- Redux hooks ----------------------------------------------------
const mapStateToProps = state => {
  const { name, phoneNumber, emailAddress, profileImageId } = state.data.teacher;
  return { name, phoneNumber, emailAddress, profileImageId, auth: state.auth  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveTeacherInfo,
      setFirstRunCompleted,
      confirmUserSignUp,
      createUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherWelcomeScreen);
