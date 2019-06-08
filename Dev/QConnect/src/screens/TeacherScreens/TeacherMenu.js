import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AddClassNavigator from './AddClass/AddClassNavigator';
import ClassHeaderNavigator from './ClassTabs/ClassHeaderNavigator';
import LeftNavPane from './LeftNavPane';
import SettingsNavigator from './SettingsScreen/SettingsNavigator';
import TeacherProfileNavigator from './TeacherProfile/TeacherProfileNavigator';
import strings from '../../../config/strings'

const routeConfig = {
  TeacherProfile: {
    screen: TeacherProfileNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Teacher',
    })
  },
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
  },
  Settings: {
    screen: SettingsNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
    })
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
const teacherClasses = createStackNavigator({ Home: drawer }, {
  headerMode: 'none',
})

export default createAppContainer(teacherClasses);
