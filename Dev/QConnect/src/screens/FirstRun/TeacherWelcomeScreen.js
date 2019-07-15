import React from "react";
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Alert, Modal, ScrollView } from "react-native";
import QcActionButton from "components/QcActionButton";
import Toast, { DURATION } from "react-native-easy-toast";
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";
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
  authCode: '',
  password: ''
}



//To-Do: All info in this class is static, still needs to be hooked up to data base in order
//to function dynamically
export class TeacherWelcomeScreen extends QcParentScreen {
  state = initialState;

  signUp(username, password, email, phone_number) {
    this.props.createUser(username, password, email, phone_number)
  }

  confirm() {
    const { authCode, emailAddress, password } = this.state
    this.props.confirmUserSignUp(emailAddress, password, authCode, this.props.navigation, 'AddClass')
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { showSignUpConfirmationModal, confirmedSignUp } } = nextProps
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
    phoneNumber: this.props.phoneNumber === undefined ? "" : this.props.phoneNumber,
    emailAddress: this.props.emailAddress === undefined ? "" : this.props.emailAddress,
    name: this.props.name === undefined ? "" : this.props.name,
    modalVisible: false,
    profileImageId: this.initialDefaultImageId,
    highlightedImagesIndices: this.getHighlightedImages(),
    confirmationModalCanceled: false,
    isPhoneValid: this.props.phoneNumber === undefined ? false : true, //todo: this should be properly validated or saved
  };

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
  // This is reused for teacher profile page and teacher welcome page
  // In teacher welcome page, teacher ID will be passed as undefined, in which case
  // we will generate a new ID before saving to the store.
  saveProfileInfo = teacherID => {
    const { name, phoneNumber, emailAddress, password } = this.state;

    if (!name || 
      !phoneNumber ||
      !emailAddress || 
      !password || 
      name.trim() === ""
      || phoneNumber.trim() === ""
      || emailAddress.trim() === ""
      || password.trim() === "") {
        Alert.alert(strings.Whoops, strings.PleaseMakeSureAllFieldsAreFilledOut);
    } else if(!this.state.isPhoneValid){
      Alert.alert(strings.Whoops, strings.InvalidPhoneNumber);
    } else {
      //Reset the confirmation dialog state cancelation state
      //In case user canceled the confirmation code dialog before, we reset that state so we can show the dialog again upon new submission
      this.setState({ confirmationModalCanceled: false });

      // trick to remove modalVisible and hilightedImagesIndices from state and pass in everything else
      const { modalVisible, highlightedImagesIndices, ...params } = this.state;


      this.signUp(emailAddress, password, emailAddress, phoneNumber);

      //generate a new id if this is a new teacher 
      if (teacherID === undefined) {
        var nanoid = require('nanoid/non-secure')
        teacherID = nanoid()
      }

      // save the relevant teacher properties
      this.props.saveTeacherInfo(
        { teacherID, ...params }
      );
    }
  };

  //------ event handlers to capture user input into state as user modifies the entries -----
  onNameChanged = value => {
    this.setState({ name: value });
  };

  onPhoneNumberChanged = phone => {
    this.setState({
      isPhoneValid: phone.isValidNumber(),
      phoneNumber: phone.getValue()
    });
  };

  onEmailAddressChanged = value => {
    this.setState({ emailAddress: value });
  };
  onPasswordChanged = value => {
    this.setState({ password: value })
  }
  onAuthCodeChanged = value => {
    this.setState({ authCode: value })
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
      signUpErrorMessage,
      confirmedSignUp
    } } = this.props

    return (
      <View><ScrollView>
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
                style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                showPasswordField={true}
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
                onPress={() => this.saveProfileInfo()} 
                isLoading={isAuthenticating}
                screen={this.name}
              />
            </View>
            <View style={styles.filler} />
            {
              showSignUpConfirmationModal &&
              !this.state.confirmationModalCanceled && 
              !signUpErrorMessage && 
              !signUpError && (
                <Modal
                  transparent={true}>
                  <View style={styles.modal}>
                    <Text style={styles.confirmationMessage}>Please enter the validation code sent to your email</Text>
                    <Input
                      placeholder={strings.AuthorizatonConde}
                      type='authCode'
                      keyboardType='numeric'
                      onChangeText={this.onAuthCodeChanged}
                      value={this.state.authCode}
                      keyboardType='numeric'
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                      <QcActionButton
                        text={strings.Confirm}
                        onPress={this.confirm.bind(this)}
                        isLoading={isAuthenticating}
                      />
                      <QcActionButton
                        text={strings.Cancel}
                        onPress={() => { this.setState({ confirmationModalCanceled: true }) }}
                      />
                    </View>
                  </View>
                </Modal>
              )
            }
            <Toast ref="toast" />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </ScrollView></View>
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
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 230,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.grey,
    borderBottomWidth: 1,
    shadowColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    marginLeft: 45,
    marginRight: 45,
    paddingRight: 5,
    paddingLeft: 5
  },
  confirmationMessage: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'regular',
    color: colors.darkGrey
  }
});

//-------------- Redux hooks ----------------------------------------------------
const mapStateToProps = state => {
  const { name, phoneNumber, emailAddress, profileImageId } = state.data.teacher;
  return { name, phoneNumber, emailAddress, profileImageId, auth: state.auth };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveTeacherInfo,
      confirmUserSignUp,
      createUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherWelcomeScreen);
