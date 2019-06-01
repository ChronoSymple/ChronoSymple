import 'react-native';
import React from 'react';
import Login from '../Components/Auth/Login';
import renderer from 'react-test-renderer';

test('Login snapshot', () => {
	const snap = renderer.create(
		<Login />
	).toJSON();

	expect(snap).toMatchSnapshot();
});