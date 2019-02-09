import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ClassTabsNavigator from './ClassTabsNavigator';

const ClassHeaderNavigator = createStackNavigator({
  CurrentClass: {
    screen: ClassTabsNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Monday Class - ICOE',
      headerLeft: (
        <Icon
          name="menu"
          size={30}
          type="entypo"
          iconStyle={{ paddingLeft: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    }),
  },
},
{
    drawerLabel: 'Monday Class - ICOE',
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
  });


export default ClassHeaderNavigator;