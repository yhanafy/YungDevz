import React from 'react';
import {createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';
import AddClassNavigator from './AddClass/AddClassNavigator';
import ClassHeaderNavigator from './ClassTabs/ClassHeaderNavigator';
import LeftNavPane from './LeftNavPane';
import TeacherProfileNavigator from './TeacherProfile/TeacherProfileNavigator';
import strings from '../../../config/strings'

const routeConfig = {
  TeacherProfile: {
    screen: TeacherProfileNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Teacher',
    })
  },
  //Todo: The drawer must be dynamic and must map out all of the classes and display them in
  //the drawer options
  CurrentClass: {
    screen: ClassHeaderNavigator,
    path: 'teacher/class/tabs', //todo: the path should have class id as a param to be unique
    navigationOptions: ({ navigation }) => ({
        title: 'Quran Class',
      }),
 },
 AddClass: {
  screen: AddClassNavigator,
  path: 'teacher/class/new',
  navigationOptions: ({ navigation }) => ({
     title: strings.AddNewClass,
   }),
}
};

const navigationConfig = {
    contentComponent: LeftNavPane,
    drawerWidth: 325,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'CurrentClass'
}


const drawer = createDrawerNavigator(routeConfig, navigationConfig);
const teacherClasses = createStackNavigator({Home: drawer}, {headerMode: 'none'});

export default createAppContainer(teacherClasses);
