import React from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import AddClassScreen from './AddClassScreen';
import TopBanner from 'components/TopBanner';
import strings from '../../../../config/strings';

const AddClassNavigator = createStackNavigator({
  AddClass: {
    screen: AddClassScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <TopBanner
          LeftIconName="navicon"
          LeftOnPress={() => navigation.openDrawer()}
          Title={strings.AddNewClass}
        />
      )
    }),
  },
},
{
    drawerLabel: strings.AddNewClass,
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