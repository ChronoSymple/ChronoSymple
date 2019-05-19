import { stringify } from "qs";

//const baseUrl = 'http://192.168.0.11:3000'
const baseUrl = 'http://10.41.160.84:3000'

export function APIAddModule (token, id) {
	console.log('id ' + id, ' token ' + token)
	return fetch(baseUrl + '/api/patients/add_module/' + id, {
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
	return fetch(baseUrl + '/api/patients/modules', {
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