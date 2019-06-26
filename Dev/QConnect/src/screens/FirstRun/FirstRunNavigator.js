import { createStackNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import FirstRunScreen from './FirstRunScreen';
import TeacherMenu from '../TeacherScreens/TeacherMenu';
import TeacherWelcomeScreen from './TeacherWelcomeScreen';
import AddClassScreen from '../TeacherScreens/AddClass/AddClassScreen';
import TopBanner from 'components/TopBanner';
import strings from 'config/strings';
import LoginScreen from 'screens/AuthenticationScreens/LoginScreen'

const routeConfig = {
    FirstRunScreen: {
        screen: FirstRunScreen
    },
    TeacherWelcomeScreen: {
        screen: TeacherWelcomeScreen
    },
    TeacherScreens: {
        screen: TeacherMenu
    },
    LoginScreen: {
        screen: LoginScreen
    },
    AddClassScreenFirstRun: {
        screen: AddClassScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    Title={strings.AddNewClass}
                />
            )
        }),
    }
}

const navigatorConfig = {
    headerMode: 'none',
}

const FirstRunStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

const FirstRunNavigator = createAppContainer(FirstRunStackNavigator);

export default FirstRunNavigator;
