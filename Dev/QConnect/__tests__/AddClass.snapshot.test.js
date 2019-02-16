import React from 'react';
import AddClassScreen from '../src/screens/TeacherScreens/AddClass/AddClassScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<AddClassScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});