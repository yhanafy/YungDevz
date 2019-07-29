//This will be the actual drawer items that will display from the student side when the click on
//the hamburger icon
import React from "react";
import { View, FlatList, ScrollView, StyleSheet, Modal, Text } from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import { SafeAreaView } from "react-navigation";
import QcAppBanner from "components/QcAppBanner";
import QcDrawerItem from "components/QcDrawerItem";
import studentImages from "config/studentImages";
import strings from 'config/strings';
import QcParentScreen from "screens/QcParentScreen";
import { Input } from 'react-native-elements';
import QcActionButton from 'components/QcActionButton';
import { saveStudentInfo } from "model/actions/saveStudentInfo";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class LeftNavPane extends QcParentScreen {
    name = "LeftNavPane";

    state = {
        modalVisible: false,
        authCode: ""
    }

    joinClass() {
        //Add method to join the class
    }

    openClass = (id, className) => {
        //update current class index in redux
        this.props.saveStudentInfo(
            { currentClassID: id }
        );

        //navigate to the selected class
        this.props.navigation.push("CurrentClass");
        this.props.navigation.closeDrawer();
    };

    //todo: change the ListItem header and footer below to the shared drawer component intead
    //generalize the QcDrawerItem to accept either an image or an icon
    render() {
        const { classes, name, imageId } = this.props;

        const profileCaption = name + strings.sProfile
        const studentImageId = imageId;

        return (
            <ScrollView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
                <SafeAreaView
                    style={styles.container}
                    forceInset={{ top: "always", horizontal: "never" }}>
                    <View
                        style={{
                            padding: 10,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <QcAppBanner />
                    </View>

                    <QcDrawerItem
                        title={profileCaption}
                        image={studentImages.images[studentImageId]}
                        onPress={() => this.props.navigation.push("StudentProfileScreen")} />

                    <FlatList
                        data={classes}
                        keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
                        renderItem={({ item, index }) => (
                            <QcDrawerItem
                                title={item.name}
                                image={classImages.images[item.imageId]}
                                onPress={() => this.openClass(item.id, item.name)}
                            />
                        )} />

                    <QcDrawerItem
                        title={strings.JoinClass}
                        icon="plus"
                        onPress={() => {
                            this.props.navigation.closeDrawer();
                            this.setState({ modalVisible: true });
                        }} />
                    <QcDrawerItem
                        title={strings.Settings}
                        icon="cogs"
                        onPress={() => this.props.navigation.push("Settings")} />

                    <Modal
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClode={() => { }}>

                        <View style={styles.modal}>
                            <Text style={styles.confirmationMessage}>{strings.TypeInAClassCode}</Text>
                            <Input
                                type='authCode'
                                keyboardType='numeric'
                                onChangeText={(text) => { this.setState({ authCode: text }) }}
                                value={this.state.authCode}
                                keyboardType='numeric' />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                                <QcActionButton
                                    text={strings.Cancel}
                                    onPress={() => { this.setState({ modalVisible: false }) }} />
                                <QcActionButton
                                    text={strings.Confirm}
                                    onPress={() => {
                                        //Joins the class
                                        this.joinClass();
                                        this.setState({ modalVisible: false });
                                    }} />
                            </View>
                        </View>
                    </Modal>

                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    confirmationMessage: {
        fontSize: 16,
        marginVertical: 10,
        fontFamily: 'regular',
        color: colors.darkGrey
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
});

const getStudentClasses = (classIds, classes) => {
    return Object.values(classes).filter(c => classIds.includes(c.id))
}

const mapStateToProps = state => {
    const { name, imageId, currentClassID } = state.data.student;
    const classes = getStudentClasses(state.data.student.classes, state.data.classes);

    return { classes, name, imageId, currentClassID };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveStudentInfo
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavPane);

