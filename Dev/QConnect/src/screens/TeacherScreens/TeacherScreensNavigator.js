import React from 'react';
import {TabNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import colors from 'config/colors';
import { Icon } from 'react-native-elements';
import ClassMainScreen from 'screens/TeacherScreens/ClassMainScreen';

  const routeConfig = {
    ClassStudentsTab: {
        screen: ClassMainScreen,
        path: '/class',
        navigationOptions: {
        tabBarLabel: 'Class',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
                name="group"
                size={20}
                type="font-awesome"
                color={tintColor}
            />
        ),
        },
    },
    EditClassTab: {
        screen: ClassMainScreen,
        path: '/edit_class',
        navigationOptions: {
        tabBarLabel: 'Edit',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
                name="edit"
                size={20}
                type="font-awesome"
                color={tintColor}
            />
        ),
        },
    },
    AttendanceTab: {
        screen: ClassMainScreen,
        path: '/first_run',
        navigationOptions: {
        tabBarLabel: 'Attendance',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
                name="calendar-check-o"
                size={20}
                type="font-awesome"
                color={tintColor}
            />
        ),
        },
    }
}

const navigatorConfig = {
    initialRouteName: 'ClassStudentsTab',
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: colors.black,
      inactiveTintColor: colors.darkGrey,
      style: {
        backgroundColor: colors.white,
      },
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true,
    },
    defaultNavigationOptions: {
        drawerLabel: 'ClassStudentsTab',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="group"
            size={30}
            iconStyle={{
              width: 30,
              height: 30,
            }}
            type="material"
            color={tintColor}
          />
        ),
      }
  };

const TeacherBottomTabNavigator = createBottomTabNavigator(routeConfig, navigatorConfig);

const TeacherScreensNavigator = createAppContainer(TeacherBottomTabNavigator);

export default TeacherScreensNavigator;
