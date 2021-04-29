import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers/rootReducer';
import reduxPromise  from 'redux-promise';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import Spinner from './utility/Spinner/Spinner';
const persistConfig={
  key:'root',
  storage,
  stateReconciler:autoMergeLevel2,
  blacklist:["siteModal"]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const theStore=applyMiddleware(reduxPromise)(createStore)(persistedReducer);

const persistor=persistStore(theStore)


ReactDOM.render(
  <Provider store={theStore}>
    <PersistGate loading={<Spinner/>} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
