import { createStackNavigator, createAppContainer, DrawerActions } from 'react-navigation';
import FirstRunScreen from './FirstRunScreen';
import TeacherMenu from '../TeacherScreens/TeacherMenu';

const routeConfig = {
    FirstRunScreen: {
        screen: FirstRunScreen
    },
    TeacherScreens: {
        screen: TeacherMenu
    }
}

const navigatorConfig = {
    headerMode: 'none',
}

const FirstRunStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

const FirstRunNavigator = createAppContainer(FirstRunStackNavigator);

export default FirstRunNavigator;
