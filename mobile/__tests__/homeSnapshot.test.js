import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Store from '../Redux/Store/configureStore';
import { Provider } from 'react-redux';
import mockStore from 'redux-mock-store';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Navigator from '../Navigation/Navigation';
import Login from '../Components/Auth/Login';

describe('Login screen', () => {
  it('this is a test for a page', () => {

	const LoginStack = createStackNavigator({
		Login: { screen: Login },
	})

	const StackNavigator = createStackNavigator({
		LoginStack: {
			screen: LoginStack, headerMode : 'none'
		}
	},{
		headerMode: 'none'
	});
	const App = createAppContainer(StackNavigator);
	const tree = renderer.create(<Provider store={Store}> <App /> </Provider>).toJSON();
  	expect(tree).toMatchSnapshot();


  });
});