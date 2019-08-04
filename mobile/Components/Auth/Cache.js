import { AsyncStorage } from 'react-native'

export function getToken() {
	try {
		
		let value = AsyncStorage.getItem('token');
		return value
	} catch (error) {
		return 'C\'est UNE ERREUR' + error.message;
	}
}

export async function setToken(token) {
	try {
		await AsyncStorage.setItem('token', token);
	} catch (error) {
		return error.message;
	}
}

export async function removeToken(token) {
	try {
		await AsyncStorage.removeItem('token');
	} catch (error) {
		return error.message;
	}
}