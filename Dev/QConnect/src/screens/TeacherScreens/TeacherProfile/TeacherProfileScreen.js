import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import QcActionButton from 'components/QcActionButton';
import colors from 'config/colors';

//To-Do: All info in this class is static, still needs to be hooked up to data base in order
//to function dynamically
export class TeacherProfileScreen extends Component {
    render() {
        return(
            //Random image appears, still need to hook up database, see to-do above
            <View style={styles.container}>
                <View style={styles.picContainer}>
                    <Image 
                        style={styles.profilePic} 
                        source={{uri: "https://randomuser.me/api/portraits/thumb/women/42.jpg"}} />
                    <QcActionButton
                        text="Change Profile Photo"
                        onPress={() => this.editProfilePic(0)} />
                </View>
                <View style={styles.editInfo}>
                    <View style={styles.infoRow}>
                        <Text style={{fontSize: 28, paddingLeft: 20}}>Information</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoTitle}>Name</Text>
                        <TextInput 
                        style={styles.infoTextInput} 
                        defaultValue="Eslam Abdo"/>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoTitle}>Phone Number</Text>
                        <TextInput 
                        style={styles.infoTextInput} 
                        defaultValue="425-XXX-XXXX"/>
                    </View>
                    <View style={styles.infoRowLast}>
                        <Text style={styles.infoTitle}>Password</Text>
                        <TextInput 
                        style={styles.infoTextInput} 
                        defaultValue="12345678"/>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <QcActionButton
                    text="Save"
                    onPress={() => this.saveProfileInfo(0)}
                    />
                    <QcActionButton
                    text="Cancel"
                    onPress={() => this.props.navigation.navigate('TeacherProfile')}
                    />
                </View>
            </View>
        )
    }

    //to-do: method must be able to update the profile picture
    editProfilePic = (teacherID) => {

    }

    //to-do: method must be able to save profile info
    saveProfileInfo= (teacherID) => {
        
    }
}

//Styles for the Teacher profile class
const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        backgroundColor: colors.lightGrey,
        flex: 1
    },
    picContainer: {
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: 20
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
        fontSize: 22
    },
    infoTitle: {
        paddingLeft: 20, 
        fontSize: 22
    },
    buttonsContainer: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    }
})

export default TeacherProfileScreen;

