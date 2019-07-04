import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import StudentMainScreen from './StudentMainScreen';
import TopBanner from '../../components/TopBanner';

const routeConfig = {

    StudentMainScreen: {
        screen: StudentMainScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="navicon"
                    LeftOnPress={
                        //Todo: A drawer needs to open with options to join a class
                        () => { }
                    }
                    Title={
                        //Todo: Make sure an actual class name is passed and not a hard coded one
                        "Tuesday Hifth Class"
                    }
                    RightOnPress={() => { }}
                />
            ),
        }),
    },
}

const navigatorConfig = {
    initialRouteName: 'StudentMainScreen'
}

const StudentScreensStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

const StudentScreensNavigator = createAppContainer(StudentScreensStackNavigator);

export default StudentScreensNavigator;