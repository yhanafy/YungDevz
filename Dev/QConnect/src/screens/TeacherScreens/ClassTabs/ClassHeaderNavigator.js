import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ClassTabsNavigator from './ClassTabsNavigator';
import StudentProfileScreen from 'screens/StudentProfile/StudentProfileScreen'

const ClassHeaderNavigator = createStackNavigator({
  CurrentClass: {
    screen: ClassTabsNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Monday Class - ICOE',
      headerLeft: (
        <Icon
          name="navicon"
          type="font-awesome"
          iconStyle={{ paddingLeft: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    }),
  },
  StudentProfile: {
    screen: StudentProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
      headerLeft: (
        <Icon
          name="angle-left"
          type="font-awesome"
          iconStyle={{ paddingLeft: 10 }}
          onPress={() => navigation.goBack()}
        />
      ),
    }),
  }
},
{
    drawerLabel: 'Monday Class - ICOE',
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="navicon"
        type="font-awesome"
        color={tintColor}
      />
    ),
  });


export default ClassHeaderNavigator;