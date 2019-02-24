import React from 'react';
import TopBanner from 'components/TopBanner'
import { createStackNavigator, DrawerActions } from 'react-navigation';
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
          LeftOnPress={() => navigation.openDrawer()}
          Title={(navigation.state.params && navigation.state.params.classTitle)? navigation.state.params.classTitle : 'Quran Class'}
          Icon2Name="edit"
          RightOnPress={() => navigation.push('ClassEdit', navigation.state.params)}
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
          LeftOnPress={() => navigation.goBack()}
          Title={navigation.state.params.name}
          Icon2Name="edit"
          RightOnPress={() => {}}
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
          Text1Name="Cancel"
          LeftOnPress={() => navigation.goBack()}
          Title="Edit Class"
          Text2Name="Save"
          RightOnPress={() => navigation.goBack()}
        />
      )
    })
  }

})


export default ClassHeaderNavigator;