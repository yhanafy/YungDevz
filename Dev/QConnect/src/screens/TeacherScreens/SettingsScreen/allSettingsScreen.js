//Screen which will provide all of the possible settings for the user to click on
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import colors from 'config/colors';
import { Icon } from 'react-native-elements';
import strings from '../../../../config/strings';
import QcParentScreen from "screens/QcParentScreen";

export default class AllSettingsScreen extends QcParentScreen {

    name = "AllSettingsScreen";

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.cardStyle, { marginTop: 25 }]} onPress={() => {
                    this.props.navigation.push("CreditsScreen");
                }}>
                    <Text style={styles.textStyle}>{strings.Credits}</Text>
                    <Icon
                        name='angle-right'
                        type='font-awesome'
                        iconStyle={{ marginRight: 20 }}
                        color={colors.primaryDark} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardStyle} onPress={() => {
                    Linking.openURL('https://app.termly.io/document/privacy-policy/d3e756e4-a763-4095-9ec1-3965b609d015')
                }}>
                    <Text style={styles.textStyle}>{strings.PrivacyPolicy}</Text>
                    <Icon
                        name='angle-right'
                        type='font-awesome'
                        iconStyle={{ marginRight: 20 }}
                        color={colors.primaryDark} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.cardStyle, { marginTop: 25 }]} onPress={() => {
                    this.props.navigation.push("FirstRun");
                }}>
                    <Text style={styles.textStyle}>{strings.LogOut}</Text>
                    <Icon
                        name='angle-right'
                        type='font-awesome'
                        iconStyle={{ marginRight: 20 }}
                        color={colors.primaryDark} />
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1,
    },
    cardStyle: {
        flexDirection: 'row',
        marginRight: 7,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 7,
        marginTop: 30,
        fontFamily: 'regular',
        backgroundColor: colors.white
    },
    textStyle: {
        fontFamily: 'regular',
        fontSize: 20,
        color: colors.black,
        marginLeft: 20
    },
})