import React, {Component} from 'react';
import FirstRunNavigator from 'screens/FirstRun/FirstRunNavigator'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import classReducer from 'model/reducers/classReducer'

const store = createStore(classReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store= { store} >
        <FirstRunNavigator />
      </Provider>
    );
  }
}

