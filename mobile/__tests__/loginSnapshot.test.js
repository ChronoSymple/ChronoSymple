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

	const navigation = {navigate: jest.fn()}
	const tree = renderer.create(<Provider store={Store}> <Login navigation={navigation}/> </Provider>).toJSON();
  	expect(tree).toMatchSnapshot();
  });
});