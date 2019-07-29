import React, { Component } from 'react';
import FirstScreenNavigator from 'screens/FirstScreenLoader/FirstScreenNavigator'
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore, applyMiddleware } from 'redux';
import classReducer from 'model/reducers/classReducer'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import { AsyncStorage } from 'react-native';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import migrateFromV0ToV1 from 'model/migrationScripts/migrateFromV0ToV1';
import migrateFromV1ToV2 from 'model/migrationScripts/migrateFromV1ToV2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

const migrations = {
  1: (state) => migrateFromV0ToV1(state),
  2: (state) => migrateFromV1ToV2(state),
}

const persistConfig = {
  key: 'qcstorealpha001',
  storage: AsyncStorage,
  version: 2,
  debug: true,  //we should consider turn off verbose logs at some point, but we keep them now until we have enough validation.
  migrate: createMigrate(migrations, { debug: true })
}
const persistedReducer = persistReducer(persistConfig, classReducer)

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
  //This is to allow react native redux debugger to show redux content
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const persistor = persistStore(store);
export default class App extends Component {

  renderLoading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    return (
      <Provider store={store} >
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <FirstScreenNavigator />
        </PersistGate>
      </Provider>
    );
  }
}


