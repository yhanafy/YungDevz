//Component represents a top banner that will have three components within it,
//an icon, a title, and another icon that will all be equally seperated
import FontLoadingComponent from './FontLoadingComponent';
import React from 'React';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from 'config/colors'
import { connect } from "react-redux";
import strings from "config/strings"

class TopBanner extends FontLoadingComponent {
    render() {
        //Component properties
        const {LeftIconName, LeftTextName, LeftOnPress, Title, 
            RightIconName, RightTextName, RightOnPress, className} = this.props;
        let headerTitle = (Title === strings.titleNotPassed)?  className : Title ;

        console.log("passed in: " + Title + ". redux: " + className + ". header: " + headerTitle)
        return(
            <View>
                {this.state.fontLoaded ? (
                    <View style={styles.entireTopView}>
                    <View style={styles.topLeftView}>
                        <Icon
                            name={LeftIconName}
                            type="font-awesome"
                            onPress={() => {LeftOnPress()}}
                        />
                        <Text style={styles.leftText} 
                            onPress={() => {LeftOnPress()}}>{LeftTextName}</Text>
                    </View>
                    <View style={styles.topMiddleView}>
                        <Text style={styles.titleStyle}>{headerTitle}</Text>
                    </View>
                    <View style={styles.topRightView}>
                        <Icon
                            name={RightIconName}
                            type="font-awesome"
                            onPress={() => {RightOnPress()}}
                        />
                        <Text style={styles.rightText}
                            onPress={() => {RightOnPress()}}>{RightTextName}</Text>
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
        borderBottomColor: colors.black
    },
    topLeftView: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        flexDirection: 'row'
    },
    topMiddleView: {
        height: 100,
        paddingBottom: 3,
        justifyContent: 'center'
    },
    topRightView: {
        height: 100,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingRight: 20,
        flexDirection: 'row'
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
    let classIndex = state.data.teachers[0].currentClassIndex;
    let className = classIndex >= 0 ? state.data.teachers[0].classes[classIndex].name : "Quran Class";
    return { className };
};
  
export default connect(mapStateToProps)(TopBanner);