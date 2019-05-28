//This will be the credits screen
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, Linking } from 'react-native';
import colors from 'config/colors';
import strings from 'config/strings';

export default class creditsScreen extends Component {
    _goToURL(url) {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(this.props.url);
          } else {
            console.log('Don\'t know how to open URI: ' + this.props.url);
          }
        });
      }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.creditsContainer} contentContainerStyle={{ }}>
                    <Text style={{ marginTop: 10, }}>{strings.FirstScreenImageCredits}</Text>
                    <Text style={{ marginTop: 10, color: 'blue' }} onPress={() => {
                        Linking.openURL('https://www.freepik.com/free-photos-vectors/computer')
                }} >{strings.AvatarCredits}</Text>
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
        borderRadius: 20,
        padding: 15,
        margin: 20
    }
});

