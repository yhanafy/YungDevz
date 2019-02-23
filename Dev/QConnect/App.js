import React, {Component} from 'react';
import FirstRunNavigator from 'screens/FirstRun/FirstRunNavigator'
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'redux';
import classReducer from 'model/reducers/classReducer'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';


const persistConfig = {
  key: 'eetest12',
  storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, classReducer)

export const store = createStore(
  persistedReducer,
  undefined
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
        <FirstRunNavigator />
      </PersistGate>
      </Provider>
    );
  }
}

