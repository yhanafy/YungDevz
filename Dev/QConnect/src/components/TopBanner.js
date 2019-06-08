//Component represents a top banner that will have three components within it,
//an icon, a title, and another icon that will all be equally seperated
import FontLoadingComponent from './FontLoadingComponent';
import React from 'React';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from 'config/colors'
import { connect } from "react-redux";
import strings from "config/strings"

class TopBanner extends FontLoadingComponent {
    render() {
        //Component properties
        const { LeftIconName, LeftTextName, LeftOnPress, Title,
            RightIconName, RightTextName, RightOnPress, className } = this.props;
        let headerTitle = (Title === strings.titleNotPassed) ? className : Title;

        return (
            <View>
                {this.state.fontLoaded ? (
                    <View style={styles.entireTopView}>
                        <View style={styles.topLeftView}  >
                            <TouchableOpacity style={{flex: 1, flexDirection: 'row',  paddingLeft: 20, height: 100, justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => { LeftOnPress() }} >
                            <Icon
                                name={LeftIconName}
                                type="font-awesome"
                            />
                            <Text style={styles.leftText}
                                onPress={() => { LeftOnPress() }}>{LeftTextName}</Text> 
                             </TouchableOpacity>
                        </View>

                        <View style={styles.topMiddleView}>
                            <Text style={styles.titleStyle}>{headerTitle}</Text>
                        </View>

                        <View style={styles.topRightView} >
                            <TouchableOpacity style={{flex: 1, flexDirection: 'row',  paddingRight: 20, height: 100, justifyContent: 'flex-end', alignItems: 'center'}}  onPress={() => { RightOnPress() }}>
                            <Icon
                                name={RightIconName}
                                type="font-awesome"  
                            />
                            <Text style={styles.rightText}
                                onPress={() => { RightOnPress() }}>{RightTextName}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                        <View></View>
                    )}
            </View>
        );
    }
}

//Verifies the propTypes are correct
TopBanner.propTypes = {
    LeftIconName: PropTypes.string,
    LeftTextName: PropTypes.string,
    LeftOnPress: PropTypes.func,
    Title: PropTypes.string,
    RightIconName: PropTypes.string,
    RightTextName: PropTypes.string,
    RightOnPress: PropTypes.func,
}

const styles = StyleSheet.create({
    entireTopView: {
        height: 83.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: colors.white,
        borderBottomWidth: 0.25,
        borderBottomColor: colors.black,
        paddingTop: 25,
    },
    topLeftView: { 
        flex: 1.5
    },
    topMiddleView: {
        height: 100,
        paddingBottom: 3,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flex: 4
    },
    topRightView: {
        flex: 1.5,
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 22,
        color: colors.primaryDark,
        fontFamily: 'regular',
    },
    leftText: {
        fontSize: 15,
    },
    rightText: {
        fontSize: 15,
    }
});

const mapStateToProps = (state) => {
    let classId = state.data.teacher.currentClassId;
    let className = classId.length > 0 ? state.data.classes[classId].name : "Quran Class";
    return { className };
};

export default connect(mapStateToProps)(TopBanner);