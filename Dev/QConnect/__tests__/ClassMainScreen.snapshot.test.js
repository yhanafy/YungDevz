import React from 'react';
import ClassMainScreen from '../src/screens/TeacherScreens/ClassTabs/ClassMainScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<ClassMainScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});