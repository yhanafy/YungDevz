import React from 'react';
import ClassAttendanceScreen from '../src/screens/TeacherScreens/ClassTabs/ClassAttendanceScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<ClassAttendanceScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});