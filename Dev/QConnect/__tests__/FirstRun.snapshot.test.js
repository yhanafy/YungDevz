import React from 'react';
import FirstRunScreen from '../src/screens/FirstRun/FirstRunScreen.js';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<FirstRunScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});