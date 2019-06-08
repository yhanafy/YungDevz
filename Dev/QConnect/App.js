import React, {Component} from 'react';
import FirstScreenNavigator from 'screens/FirstScreenLoader/FirstScreenNavigator'
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'redux';
import classReducer from 'model/reducers/classReducer'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);


const persistConfig = {
  key: 'qcstorealpha001',
  storage: AsyncStorage,
  version: 0,
}
const persistedReducer = persistReducer(persistConfig, classReducer)

export const store = createStore(
  persistedReducer,
  //This is to allow react native redux debugger to show redux content
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const persistor = persistStore(store);
export default class App extends Component {

  renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    return (
      <Provider store= { store} >
      <PersistGate persistor={persistor} loading={this.renderLoading()}>
        <FirstScreenNavigator />
      </PersistGate>
      </Provider>
    );
  }
}


