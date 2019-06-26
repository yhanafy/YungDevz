import FirstRunNavigator from 'screens/FirstRun/FirstRunNavigator'
import TeacherMenu from 'screens/TeacherScreens/TeacherMenu';
import FirstScreenLoader from './FirstScreenLoader'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from '../AuthenticationScreens/LoginScreen';


export default createAppContainer(createSwitchNavigator(
  {
    FirstScreenLoader: FirstScreenLoader,
    App: TeacherMenu,
    FirstRun: FirstRunNavigator,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'FirstRun',
  }
));