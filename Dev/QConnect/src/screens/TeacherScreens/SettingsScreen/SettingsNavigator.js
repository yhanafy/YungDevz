//The navigator for all of the settings that the user can go to
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import allSettingsScreen from './allSettingsScreen';
import creditsScreen from './creditsScreen';
import TopBanner from 'components/TopBanner';
import strings from '../../../../config/strings';
import FirstRunScreen from '../../FirstRun/FirstRunScreen';

const SettingsNavigator = createStackNavigator({
    Settings: {
        screen: allSettingsScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="navicon"
                    LeftOnPress={() => navigation.openDrawer()}
                    Title={strings.Settings}
                />
            )
        }),
    },
    CreditsScreen: {
        screen: creditsScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                    LeftIconName="angle-left"
                    LeftOnPress={() => navigation.goBack()}
                    Title={strings.Credits}
                />
            )
        }),
    },
    FirstRun: {
        screen: FirstRunScreen,
        navigationOptions: ({ navigation }) => ({
            header: (null)
        }),
    },
},
    {
        initialRouteName: 'Settings',
        drawerLabel: strings.Settings,
        drawerIcon: ({ tintColor }) => (
            <Icon
                name="cogs"
                size={30}
                iconStyle={{
                    width: 30,
                    height: 30,
                }}
                type="material"
                color={tintColor}
            />
        ),
    });



export default SettingsNavigator;