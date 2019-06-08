import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import TeacherProfileScreen from './TeacherProfileScreen';
import TopBanner from 'components/TopBanner';
import strings from '../../../../config/strings';

const TeacherProfileNavigator = createStackNavigator({
  TeacherProfile: {
    screen: TeacherProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <TopBanner
          LeftIconName="navicon"
          LeftOnPress={() => navigation.openDrawer()}
          Title={strings.MyProfile}
        />
      )
    })
  }
},
  {
    drawerLabel: strings.MyProfile,
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

export default TeacherProfileNavigator;