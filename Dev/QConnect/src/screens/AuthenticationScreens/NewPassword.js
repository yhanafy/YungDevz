import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, Modal, KeyboardAvoidingView, ImageBackground, Dimensions } from 'react-native';
import strings from 'config/strings';
import colors from 'config/colors';
import QcActionButton from 'components/QcActionButton';
import QcAppBanner from "components/QcAppBanner";
import QcParentScreen from "screens/QcParentScreen";
import { Alert } from 'react-native'


export default class NewPassword extends Component {
    state= {
        isModalVisible: false,
        newPassordText: "",
        confirmPasswordText: ""
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                 
                    <KeyboardAvoidingView style={styles.emailInputContainer}>
                        
                        <View >
                            <Text style={styles.header}>
                                Enter New Password
                            </Text>
                        </View>
                        
                        <TextInput
                            style={styles.notesStyle}
                            returnKeyType={"done"}
                            blurOnSubmit={true}
                            placeholder={strings.NewPasswordPlaceholder}
                            placeholderColor={colors.black}
                            value={this.state.newPassordText}
                            onChangeText={(text) => { this.setState({ newPassordText: text }) }}
                        />
                          <TextInput
                            style={styles.notesStyle}
                            returnKeyType={"done"}
                            blurOnSubmit={true}
                            placeholder={strings.ConfirmPasswordPlaceholder}
                            placeholderColor={colors.black}
                            value={this.state.confirmPasswordText}
                            onChangeText={(text) => { this.setState({ confirmPasswordText: text }) }}
                        />
                        
                        <View style={styles.buttonsContainer}>
                            <QcActionButton
                                text={strings.Submit}
                                onPress={()=>{
                                    if (this.state.newImprovementText == ""){
                                        Alert.alert(strings.ErrorWithPassword, strings.EnterNewPassword)
                                    }
                                    else if (this.state.confirmPasswordText == "")
                                    { 
                                        Alert.alert(strings.ErrorWithConfirm, strings.ConfirmPassword)
                                    }
                                    else{
                                        this.setState({isModalVisible: true})}}
                                    }
                                  
                            />
                            <View style={styles.spacer} />
                            <View style={{ flex: 1 }}>
                                <View>
                                    <View style={{ flex: 1 }} />
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ flex: 1 }} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1
    },
    spacer: {
        flex: 3
    },
    notesStyle: {
        backgroundColor: colors.lightGrey,
        alignSelf: 'stretch',
        margin: 5,
        textAlignVertical: 'top',
        borderBottomColor: colors.PrimaryLight,
        borderBottomWidth: 1,
        height: 30
    },
    emailInputContainer: {
        flexDirection: 'column',
        paddingTop: 25,
        paddingBottom: 25,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 450,
        marginHorizontal: 10,
        backgroundColor: colors.white,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        marginTop: 220
      },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colors.white,
    },
    mainTextContainer: {
        alignContent: 'center',
        margin: 20,
        fontSize: 15
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
      header: {
          fontSize: 20
      }
   
});