//This will be the credits screen
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import colors from 'config/colors';
import strings from 'config/strings';

export default class creditsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.creditsContainer} contentContainerStyle={{ alignItems: 'center' }}>
                    <Text style={{ marginTop: 10 }}>{strings.FirstScreenImageCredits}</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1,
        alignItems: 'center',
    },
    creditsContainer: {
        flexDirection: 'column',
        width: Dimensions.get('window').width - 40,
        backgroundColor: colors.white,
        borderRadius: 20
    }
});

