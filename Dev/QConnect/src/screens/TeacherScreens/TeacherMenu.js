import {createDrawerNavigator, createAppContainer, DrawerActions} from 'react-navigation';
import React from 'react';
import { Icon } from 'react-native-elements';
import AddClassNavigator from './AddClass/AddClassNavigator';
import ClassHeaderNavigator from './ClassTabs/ClassHeaderNavigator';

const routeConfig = {
 CurrentClass: {
    screen: ClassHeaderNavigator,
    path: 'teacher/class/tabs', //todo: the path should have class id as a param to be unique
    navigationOptions: ({ navigation }) => ({
        title: 'Monday Class',
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
 AddClass: {
  screen: AddClassNavigator,
  path: 'teacher/class/new',
  navigationOptions: ({ navigation }) => ({
     title: 'Add new class',
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
}
};

const navigationConfig = {
    drawerWidth: 300,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
}

const drawer = createDrawerNavigator(routeConfig, navigationConfig);

export default createAppContainer(drawer);
