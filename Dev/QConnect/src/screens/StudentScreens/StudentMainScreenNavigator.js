import React from 'react';
import TopBanner from 'components/TopBanner'
import { createStackNavigator } from 'react-navigation';
import StudentMainScreen from './StudentMainScreen';
import JoinClassScreen from './JoinClassScreen';
import strings from 'config/strings';

const StudentMainScreenNavigator = createStackNavigator({
  
    CurrentClass: {
        screen: StudentMainScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="navicon"
                    LeftOnPress={() => { navigation.openDrawer() }}
                    Title={
                        //Todo: Make sure an actual class name is passed and not a hard coded one
                        "Tuesday Hifth Class"
                    } />
            ),
        }),
    },
    JoinClass: {
        screen: JoinClassScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="navicon"
                    LeftOnPress={() => { navigation.openDrawer() }}
                    Title={strings.JoinClass} />
            ),
        }),
    },

})


export default StudentMainScreenNavigator;