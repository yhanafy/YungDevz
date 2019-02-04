import { createStackNavigator, createAppContainer } from 'react-navigation'
import FirstRunScreen from './FirstRunScreen'
import TeacherScreensNavigator from 'screens/TeacherScreens/TeacherScreensNavigator'

const routeConfig = {
    FirstRunScreen: {
        screen: FirstRunScreen
    },
    TeacherScreensNavigator: {
        screen: TeacherScreensNavigator
  }
}

const navigatorConfig = {
    headerMode: 'none',
  }

const FirstRunStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

const FirstRunNavigator = createAppContainer(FirstRunStackNavigator);

export default FirstRunNavigator;
