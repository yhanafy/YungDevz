import React from "react";
import { View, TextInput, Image, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import colors from "config/colors";
import QcActionButton from "components/QcActionButton";
import QcParentScreen from "screens/QcParentScreen";
import strings from 'config/strings';

//This screen will represent the one that will allow the student to enter in a class code & then afterwards
//they will be added to the class

class JoinClassScreen extends QcParentScreen {
    name = "JoinClassScreen";


    state = {
        classCode: ""
    }

    joinClass(classCode) {
        //Joins the class
    }

    // ------------ renders the UI of the screen ---------------------------
    render() {

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder={strings.TypeInAClassCode}
                        onChangeText={code =>
                            this.setState({
                                className: code
                            })
                        } />
                    <QcActionButton
                        text={strings.JoinClass}
                        onPress={() => {
                            //join the class
                            this.joinClass(this.state.classCode)
                        }}
                        screen={this.name}
                    />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}

//Styles for the Teacher profile class
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textInputStyle: {
        backgroundColor: colors.white,
        borderColor: colors.darkGrey,
        width: 300,
        height: 50,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    }

});

export default JoinClassScreen;