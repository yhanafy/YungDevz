import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import colors from 'config/colors'
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
      headerStyle: {
        backgroundColor: colors.white,
        height: 90,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        color: colors.primaryDark,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 22,
        alignSelf: 'center',
        fontWeight: 'normal'
      },
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
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        color: colors.primaryDark,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 22,
        alignSelf: 'center',
        fontWeight: 'normal'
      },
    })
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