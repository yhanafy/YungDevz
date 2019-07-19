import React from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import QcActionButton from 'components/QcActionButton'
import strings from 'config/strings';
import colors from 'config/colors';
//import AutoSuggest from 'react-native-autosuggest';
import surahNames from 'config/surahNames';
import InputAutoSuggest from 'components/AutoCompleteComponent/InputAutoSuggest'

export default class AssignmentEntryComponent extends React.Component {

    state = {
        input: ""
    }

    onTextChange(text){
        console.log(text + "I am an Alien from Area 51");
        this.setState({input: text});
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                presentationStyle="overFullScreen"
                visible={this.props.visible}
                onRequestClose={() => {
                }}>
                <View style={{ marginVertical: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Enter Assignment</Text>
                        {/* <AutoSuggest
                            onChangeText={(text) => this.setState({ input: text })}
                            terms={surahNames.map(value => { return value.name })}
                            onItemPress={(value) => this.setState({ input: value })}
                            textInputStyles={{ backgroundColor: colors.lightGrey }}
                            placeholder="eg. Al-Fatihah Ayahs 1-5"
                        /> */}

                        <InputAutoSuggest
                            staticData={surahNames}
                            onTextChanged={this.onTextChange.bind(this)}
                        />

                        <QcActionButton
                            text={strings.Submit}
                            screen={this.props.screen}
                            onPress={() => {
                                this.props.onSubmit(this.state.input)
                            }} />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
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
    modalTitle: {
        fontSize: 16,
        marginVertical: 10,
        fontFamily: 'regular',
        color: colors.darkGrey
    }
});