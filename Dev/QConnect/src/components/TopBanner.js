//Component represents a top banner that will have three components within it,
//an icon, a title, and another icon that will all be equally seperated
import FontLoadingComponent from './FontLoadingComponent';
import React from 'React';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from 'config/colors'

class TopBanner extends FontLoadingComponent {
    render() {
        //Component properties
        const {Icon1Name, Icon1OnPress, Title, Icon2Name, Icon2OnPress} = this.props;
        return(
            <View>
                {this.state.fontLoaded ? (
                    <View style={styles.entireTopView}>
                    <View style={styles.topLeftView}>
                        <Icon
                            name={Icon1Name}
                            type="font-awesome"
                            onPress={() => {Icon1OnPress()}}
                        />
                    </View>
                    <View style={styles.topMiddleView}>
                        <Text style={styles.titleStyle}>{Title}</Text>
                    </View>
                    <View style={styles.topRightView}>
                        <Icon
                            name={Icon2Name}
                            type="font-awesome"
                            onPress={() => {Icon2OnPress()}}
                        />
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
    Icon1Name: PropTypes.string,
    Icon1OnPress: PropTypes.func,
    Title: PropTypes.string,
    Icon2Name: PropTypes.string,
    Icon2OnPress: PropTypes.func,
}

const styles = StyleSheet.create({
    entireTopView: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: colors.white,
        borderBottomWidth: 0.25,
        borderBottomColor: colors.black
    },
    topLeftView: {
        height: 95,
        justifyContent: 'center',
        paddingLeft: 20
    },
    topMiddleView: {
        height: 95,
        paddingBottom: 3,
        justifyContent: 'center'
    },
    topRightView: {
        height: 95,
        justifyContent: 'center',
        paddingRight: 20
    },
    titleStyle: {
        fontSize: 25,
        color: colors.primaryDark
    }
});
  
  
export default TopBanner;