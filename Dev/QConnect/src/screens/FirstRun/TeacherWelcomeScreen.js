import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import QcActionButton from 'components/QcActionButton';
import Toast, { DURATION } from 'react-native-easy-toast'
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";
import { setFirstRunCompleted } from "model/actions/setFirstRunCompleted"
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import colors from 'config/colors';
import ImageSelectionRow from 'components/ImageSelectionRow'
import ImageSelectionModal from 'components/ImageSelectionModal'
import TeacherInfoEntries from 'components/TeacherInfoEntries'
import teacherImages from 'config/teacherImages';
import strings from 'config/strings';
import QcParentScreen from 'screens/QcParentScreen';

//To-Do: All info in this class is static, still needs to be hooked up to data base in order
//to function dynamically
export class TeacherWelcomeScreen extends QcParentScreen {

    name = "TeacherWelcomeScreen";

    //--- state captures the inputted user info ------------------
    state = {
        name: this.props.name,
        phoneNumber: this.props.phoneNumber,
        emailAddress: this.props.emailAddress,
        modalVisible: false,
        profileImageId: this.props.profileImageId,
        highlightedImagesIndices: [1, 2, 3, 10]
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
        })

        this.setModalVisible(false);
    }

    onTeacherFlow = () => {
        //todo: get the first class to show from redux persist (current class)
        this.props.navigation.push('AddClass');
    }

    //this method saves the new profile information to the redux database
    saveProfileInfo = (teacherID) => {
        const { name, phoneNumber, emailAddress } = this.state;
        if (name.trim() === "" || phoneNumber.trim() === "" || emailAddress.trim() === "") {
            alert(strings.PleaseMakeSureAllFieldsAreFilledOut);
        } else {
            // trick to remove modalVisible and hilightedImagesIndices from state and pass in everything else
            const {modalVisible, highlightedImagesIndices, ...params} = this.state;

            // save the relevant teacher properties
            this.props.saveTeacherInfo(
                teacherID,
                params
            );

            this.props.setFirstRunCompleted(true);

            this.refs.toast.show(strings.YourProfileHasBeenSaved, DURATION.LENGTH_SHORT);
            this.onTeacherFlow();
        }
    }

    //------ event handlers to capture user input into state as user modifies the entries -----
    onNameChanged = (value) => {
        this.setState({ name: value })
    }

    onPhoneNumberChanged = (value) => {
        this.setState({ phoneNumber: value })
    }

    onEmailAddressChanged = (value) => {
        this.setState({ emailAddress: value })
    }

    //---------- render method ---------------------------------
    // The following custom components are used below:
    // -    ImageSelectionModal: implements the pop up modal to allow users to customize their avatar
    // -    TeacherInfoEntries: contains entries to capture user info (name, email, and phone number)
    // -    ImageSelectionRow: a row with suggested avatars, and a button to invoke the pop up with more avatars
    //-----------------------------------------------------------
    render() {
        return (
            //Random image appears, still need to hook up database, see to-do above
            <KeyboardAvoidingView style={styles.container} behavior="padding">
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
                        style={styles.welcomeImage}
                        source={require('assets/images/salam.png')} />
                    <Text style={styles.quote}>{strings.TeacherWelcomeMessage}</Text>
                </View>
                <View style={styles.editInfo} behavior="padding">
                    <TeacherInfoEntries
                        name={this.state.name}
                        phoneNumber={this.state.phoneNumber}
                        emailAddress={this.state.emailAddress}
                        onNameChanged={this.onNameChanged}
                        onPhoneNumberChanged={this.onPhoneNumberChanged}
                        onEmailAddressChanged={this.onEmailAddressChanged}
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
                        text={strings.Save}
                        onPress={() => this.saveProfileInfo(0)} //to-do: Make sure that teacher ID 
                    //is passed instead of 0
                        screen={this.name}
                    />
                </View>
                <View style={styles.filler}></View>
                <Toast ref="toast" />
            </KeyboardAvoidingView>
        )
    }

}

//-----------------   Styles for the Teacher profile class-----------------------------------
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1,
        justifyContent: "flex-end"
    },
    picContainer: {
        paddingTop: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: colors.white,
    },
    quote: {
        fontSize: 16,
        paddingLeft: 20,
        fontStyle: 'italic',
        paddingBottom: 10,
        color: colors.darkGrey
    },
    welcomeImage: {
        marginTop: 15,
        width: 180,
        resizeMode: 'contain',
    },
    editInfo: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        color: colors.darkGrey
    },
    buttonsContainer: {
        flexDirection: 'column',
        marginTop: 10,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    filler: {
        flexDirection: 'column',
        flex: 1,
    }
})

//-------------- Redux hooks ----------------------------------------------------
const mapStateToProps = state => {
    const { name, phoneNumber, emailAddress, profileImageId } = state.data.teachers[0];
    return { name, phoneNumber, emailAddress, profileImageId };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveTeacherInfo,
        setFirstRunCompleted
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TeacherWelcomeScreen);
