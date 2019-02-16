import React from 'react';
import ClassEditScreen from '../src/screens/TeacherScreens/ClassTabs/ClassEditScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<ClassEditScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});