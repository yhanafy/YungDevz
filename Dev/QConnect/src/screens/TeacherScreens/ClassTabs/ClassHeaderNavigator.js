import React from 'react';
import TopBanner from 'components/TopBanner'
import { createStackNavigator } from 'react-navigation';
import ClassTabsNavigator from './ClassTabsNavigator';
import StudentProfileScreen from 'screens/StudentProfile/StudentProfileScreen';
import ClassEditScreen from 'screens/TeacherScreens/ClassTabs/ClassEditScreen';

const ClassHeaderNavigator = createStackNavigator({
  CurrentClass: {
    screen: ClassTabsNavigator,
    navigationOptions: ({ navigation }) => ({
      header: (
        <TopBanner
          Icon1Name="navicon"
          Icon1OnPress={() => navigation.openDrawer()}
          Title="Quran Class"
          Icon2Name="edit"
          Icon2OnPress={() => navigation.navigate('ClassEdit')}
        />
      ),  
    }),
  },
  StudentProfile: {
    screen: StudentProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <TopBanner
          Icon1Name="angle-left"
          Icon1OnPress={() => navigation.goBack()}
          Title={navigation.state.params.name}
          Icon2Name="edit"
          Icon2OnPress={() => {}}
        />
      )
    })
  },
  //Will lead to the edit class screen. If the user clicks the left back button, the changes
  //to the class should not be saved. If however the user clicks the check mark, the changes to
  //the class will be changed. (That still needs to be coded in)
  ClassEdit: {
    screen: ClassEditScreen,
    navigationOptions: ({navigation}) => ({
      header: (
        <TopBanner
          Icon1Name="angle-left"
          Icon1OnPress={() => navigation.goBack()}
          Title="Edit Class"
          Icon2Name="check"
          Icon2OnPress={() => navigation.goBack()}
        />
      )
    })
  }

})


export default ClassHeaderNavigator;