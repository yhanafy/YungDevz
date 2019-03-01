import React from 'react';
import {ClassMainScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassMainScreen';
import renderer from 'react-test-renderer';
import {INITIAL_STATE} from '../src/model/reducers/classReducer';
import {ClassEditScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassEditScreen';
import {ClassAttendanceScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassAttendanceScreen';
import {AddClassScreen} from '../src/screens/TeacherScreens/AddClass/AddClassScreen';

describe('Teacher screens snapshots', () => {
  const testRenderTeacherScreen = (screenName, Component) => {
    test(`render ${screenName}`, () => {
        const navigation = {
          state: {
            params: {
              classIndex: 0
            }
          }
        }

        const tree = renderer.create(<Component 
          classrooms = {INITIAL_STATE} 
          navigation = {navigation}
        />).toJSON();

        expect(tree).toMatchSnapshot();
    })
  }

  testRenderTeacherScreen("ClassMainScreen", ClassMainScreen)
  testRenderTeacherScreen("ClassEditScreen", ClassEditScreen)
  testRenderTeacherScreen("ClassAttendanceScreen", ClassAttendanceScreen)
  testRenderTeacherScreen("AddClassScreen", AddClassScreen)
})