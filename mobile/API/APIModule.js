import { stringify } from "qs";

//const baseUrl = 'http://192.168.0.11:3000'
const baseUrl = 'https://docapp-prod.herokuapp.com'

export function APIAddModule (token, id) {
	return fetch(baseUrl + '/api/patients/modules/' + id +"/add_module", {
		method: 'PATCH',
		headers: {
	    'Authorization': token
		}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetModules(token) {
	return fetch(baseUrl + '/api/modules', {
	  method: 'GET',
	  headers: {
	    Accept: 'application/json',
	    'Authorization': token,
	  },
	})
	.then((response) => response.json())
	.catch((error) => error)
}

export function APIGetPatientModules(token) {
	return fetch(baseUrl + '/api/patients/modules/my_modules', {
	  method: 'GET',
	  headers: {
	    Accept: 'application/json',
	    'Authorization': token,
	  },
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetPatientNotesByModule(token, idmodule) {
	return fetch(baseUrl + '/api/notes', {
	  method: 'GET',
	  headers: {
	    Accept: 'application/json',
			'Authorization': token
		}
	})
	.then((response) => response.json())
	.catch((error) => error)
}

export function APIAddPatientNotes(token, datJson, idModule) {
	return fetch(baseUrl + '/api/notes', {
	  method: 'POST',
	  headers: {
      'Content-Type': 'application/json',			
	    'Authorization': token,
		},
		body: JSON.stringify({
				data: datJson,
				module_id: idModule
		})
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetDoctors(token) {
	return fetch(baseUrl + '/api/doctors', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Authorization': token,
		},
	})
	.then((response) => response)
	.catch((error) => error)
}