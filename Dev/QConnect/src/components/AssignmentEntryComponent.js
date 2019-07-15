import React from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import QcActionButton from 'components/QcActionButton'
import strings from 'config/strings';
import colors from 'config/colors';
import AutoSuggest from 'react-native-autosuggest';
import surahNames from 'config/surahNames';

export default class AssignmentEntryComponent extends React.Component {

    state = {
        input: ""
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
                    <View style={styles.container}>

                        <AutoSuggest
      				onChangeText={(text) => this.setState({input: text})}
                      terms={surahNames.map(value => {return value.name})}
                      onItemPress = {(value) => this.setState({input: value})}
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
    container: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: colors.grey,
        borderBottomWidth: 1,
        shadowColor: colors.darkGrey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        paddingRight: 15,
        paddingLeft: 15
    },
})