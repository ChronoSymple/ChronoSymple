import React,{Component} from 'react';
import FlashMessage from "react-native-flash-message";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigation from './Navigation/Navigation';
import Store from './Redux/Store/configureStore'
import { Provider } from 'react-redux'

export default class App extends Component{
  render(){
    return(
      <View style={{flex: 1}}>
        <Provider store={Store}>
          <Navigation/>
          <FlashMessage />
        </Provider>
      </View>
    )
  }
}