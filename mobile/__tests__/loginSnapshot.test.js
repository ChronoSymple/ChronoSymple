import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Store from '../Redux/Store/configureStore';
import { Provider } from 'react-redux';
import mockStore from 'redux-mock-store';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Login from '../Components/Auth/Login';

describe('Login screen', () => {
  it('Test of Login page', () => {

	const StackNavigator = createStackNavigator({
		Login: {
			screen: Login, headerMode : 'none'
		}
	},{
		headerMode: 'none'
	});
	const LoginNav = createAppContainer(StackNavigator);
	
	const tree = renderer.create(<Provider store={Store}> <LoginNav /> </Provider>).toJSON();
  	expect(tree).toMatchSnapshot();
  });
});