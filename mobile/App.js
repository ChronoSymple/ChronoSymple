import React,{Component} from 'react';
import { InAppNotificationProvider } from 'react-native-in-app-notification';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigation from './Navigation/Navigation';
import Store from './Redux/Store/configureStore';
import { Provider } from 'react-redux';

export default class App extends Component{

  render(){
    return(
      <InAppNotificationProvider>
        <Provider store={Store}>
          <Navigation/>
        </Provider>
      </InAppNotificationProvider>
    )
  }
}
