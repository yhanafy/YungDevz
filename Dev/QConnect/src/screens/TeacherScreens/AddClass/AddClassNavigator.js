import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AddClassScreen from './AddClassScreen';

const AddClassNavigator = createStackNavigator({
  AddClass: {
    screen: AddClassScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Add a new class',
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
    drawerLabel: 'Add new class',
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="plus"
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


export default AddClassNavigator;