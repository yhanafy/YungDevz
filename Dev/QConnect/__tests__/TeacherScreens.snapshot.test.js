import React from 'react';
import {ClassMainScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassMainScreen';
import renderer from 'react-test-renderer';
import {INITIAL_STATE} from '../src/model/reducers/classReducer';
import {ClassEditScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassEditScreen';
import {ClassAttendanceScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassAttendanceScreen';
import {AddClassScreen} from '../src/screens/TeacherScreens/AddClass/AddClassScreen';
import {TeacherProfileScreen} from '../src/screens/TeacherScreens/TeacherProfile/TeacherProfileScreen.js'

describe('Teacher screens snapshots', () => {
  const testRenderTeacherScreen = (screenName, Component, props) => {
    test(`render ${screenName}`, () => {
        const navigation = {
          state: {
            params: {
              classIndex: 0
            }
          }
        }

        const {teachers} = INITIAL_STATE;
        const { classes } = teachers[0];
        
        const tree = renderer.create(<Component 
          classes = {classes}
          navigation = {navigation}
          {...props} 
        />).toJSON();

        expect(tree).toMatchSnapshot();
    })
  }

  testRenderTeacherScreen("ClassMainScreen", ClassMainScreen)
  testRenderTeacherScreen("ClassEditScreen", ClassEditScreen)
  testRenderTeacherScreen("ClassAttendanceScreen", ClassAttendanceScreen, {defaultDate: new Date(1552719600000)})
  testRenderTeacherScreen("AddClassScreen", AddClassScreen)
  testRenderTeacherScreen("TeacherProfileScreen", TeacherProfileScreen)
})