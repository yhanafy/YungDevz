import React from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import QcActionButton from 'components/QcActionButton';
import TouchableText from 'components/TouchableText'
import teacherImages from 'config/teacherImages'
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import colors from 'config/colors';
import ImageSelectionModal from 'components/ImageSelectionModal'
import TeacherInfoEntries from 'components/TeacherInfoEntries';
import strings from 'config/strings';
import QcParentScreen from 'screens/QcParentScreen';

//To-Do: All info in this class is static, still needs to be hooked up to data base in order
//to function dynamically
export class TeacherProfileScreen extends QcParentScreen {
    name = "TeacherProfileScreen";

    state = {
        name: this.props.name,
        phoneNumber: this.props.phoneNumber,
        emailAddress: this.props.emailAddress,
        profileImageId: this.props.profileImageId,
        modalVisible: false,
        isPhoneValid: this.props.phoneNumber === undefined ? false : true, //todo: this should be properly validated or saved
    }
    //this method resets the text inputs back to the teacher's info
    resetProfileInfo = (teacherID) => {
        this.setState({
            name: this.props.name,
            phoneNumber: this.props.phoneNumber,
            emailAddress: this.props.emailAddress,
            profileImageId: this.props.profileImageId,
            isPhoneValid: this.props.phoneNumber === undefined ? false : true, //todo: this should be properly validated or saved
        });
        //Just goes to the first class
        this.props.navigation.push('CurrentClass');
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    //to-do: method must be able to update the profile picture
    editProfilePic = (teacherID) => {
        this.setModalVisible(true);
    }

    //this method saves the new profile information to the redux database
    saveProfileInfo = () => {
        const { name, phoneNumber, emailAddress } = this.state;
        if (!name ||
            !phoneNumber ||
            !emailAddress ||
            name.trim() === ""
            || phoneNumber.trim() === ""
            || emailAddress.trim() === "") {
            Alert.alert(strings.Whoops, strings.PleaseMakeSureAllFieldsAreFilledOut);
        } else if (!this.state.isPhoneValid) {
            Alert.alert(strings.Whoops, strings.InvalidPhoneNumber);
        } else {
            const { modalVisible, ...params } = this.state; // trick to remove modalVisible from state and pass in everything else
            this.props.saveTeacherInfo(
                params
            );
            this.refs.toast.show(strings.YourProfileHasBeenSaved, DURATION.LENGTH_SHORT);
            //Just goes to the first class
            this.props.navigation.push('CurrentClass');
        }
    }

    //------ event handlers to capture user input into state as user modifies the entries -----
    onNameChanged = (value) => {
        this.setState({ name: value })
    }

    onPhoneNumberChanged = (phone) => {
        this.setState({
            isPhoneValid: phone.isValidNumber(),
            phoneNumber: phone.getValue()
          });
    }

    onEmailAddressChanged = (value) => {
        this.setState({ emailAddress: value })
    }

    onImageSelected(index) {
        this.setState({ profileImageId: index, })
        this.setModalVisible(false);
    }

    //-----------renders the teacher profile UI ------------------------------------
    render() {
        return (
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
                            <Image
                                style={styles.profilePic}
                                source={teacherImages.images[this.state.profileImageId]} />
                            <TouchableText
                                text={strings.UpdateProfileImage}
                                onPress={() => this.editProfilePic(0)} />
                        </View>

                        <TeacherInfoEntries
                            name={this.state.name}
                            phoneNumber={this.state.phoneNumber}
                            emailAddress={this.state.emailAddress}
                            onNameChanged={this.onNameChanged}
                            onPhoneNumberChanged={this.onPhoneNumberChanged}
                            onEmailAddressChanged={this.onEmailAddressChanged}
                        />
                        <View style={styles.buttonsContainer}>
                            <QcActionButton
                                text={strings.Cancel}
                                onPress={() => this.resetProfileInfo()}
                                screen={this.name}
                            />
                            <QcActionButton
                                text={strings.Save}
                                onPress={() => this.saveProfileInfo(0)} //to-do: Make sure that teacher ID 
                                screen={this.name}
                            //is passed instead of 0
                            />
                        </View>
                        <View style={styles.filler}></View>
                        <Toast ref="toast" />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

}

//Styles for the Teacher profile class
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1,
        justifyContent: "flex-end"
    },
    picContainer: {
        paddingTop: 25,
        alignItems: 'center',
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: colors.white,
    },
    profilePic: {
        width: 130,
        height: 130,
        borderRadius: 65
    },
    editInfo: {
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: colors.black,
        borderBottomWidth: 0.25
    },
    //Next one is the same as previous but since it's like a fencepost algorithm, it has no border
    infoRowLast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    infoTextInput: {
        paddingRight: 20,
        fontSize: 16
    },
    infoTitle: {
        paddingLeft: 20,
        fontSize: 16
    },
    buttonsContainer: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.white,
    },
    filler: {
        flexDirection: 'column',
        flex: 1
    }
})

const mapStateToProps = state => {
    const { name, phoneNumber, emailAddress, profileImageId } = state.data.teacher;
    return { name, phoneNumber, emailAddress, profileImageId };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveTeacherInfo
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfileScreen);

