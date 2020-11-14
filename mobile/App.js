import React,{Component} from 'react';
import FlashMessage from "react-native-flash-message";

import {
  View,
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
          <FlashMessage position="top" animated={true} style={{justifyContent: 'center', alignItems: 'center'}} textStyle={{ textAlign: "center"}} />
        </Provider>
      </View>
    )
  }
}