import { AsyncStorage } from 'react-native';
import { rootReducer, applyMiddleware, createStore, compose } from 'redux';
//import { createLogger } from 'redux-logger';
//import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import {classReducer} from 'model/reducers/classReducer'

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage
}

const middlewares = [];

// if (__DEV__) {
//   middlewares.push(createLogger());
// }

const persistedReducer = persistReducer(persistConfig, classReducer)

export const store = createStore(
  persistedReducer
  //,
//   undefined,
//   composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
