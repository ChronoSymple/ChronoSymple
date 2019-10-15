import { stringify } from "qs";

//const baseUrl = 'http://192.168.0.11:3000'
const baseUrl = 'https://docapp-prod.herokuapp.com'

export function APIAddModule (token, id) {
	console.log(baseUrl + 'api/patients/general_units/' + id +"/add_module")
	return fetch(baseUrl + '/api/patients/general_units/' + id +"/add_unit" , {
		method: 'PATCH',		
		headers: {
	    'Authorization': token
		}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetModules(token) {
	return fetch(baseUrl + '/api/patients/general_units', {
	  method: 'GET',
	  headers: {
	    Accept: 'application/json',
	    'Authorization': token,
	  },
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetPatientModules(token) {
	return fetch(baseUrl + '/api/patients/units', {
	  method: 'GET',
	  headers: {
	    Accept: 'application/json',
	    'Authorization': token,
	  },
	})
	.then((response) => response)
	.catch((error) => error)
}


/*
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
*/

/*export function APIAddPatientNotes(token, datJson, idModule) {
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
*/


export function APIGetPatientNotesByModule(token, idModule) {
	return fetch(baseUrl + '/api/patients/units/' + idModule + '/notes', {
	  method: 'GET',
	  headers: {
	    Accept: 'application/json',
			'Authorization': token
		}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIAddPatientNotes(token, datJson, idModule) {
	return fetch(baseUrl + '/api/patients/units/' + idModule + '/add_note', {
	  method: 'POST',
	  headers: {
      'Content-Type': 'application/json',			
	    'Authorization': token,
		},
		body: JSON.stringify({
				data: datJson
		})
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIRemovePatientNotes(token, idNote) {
	return fetch(baseUrl + '/api/patients/units/' + idNote + '/add_note', {
	  method: 'DELETE',
	  headers: {
      'Content-Type': 'application/json',			
	    'Authorization': token,
		}
	})
	.then((response) => response)
	.catch((error) => error)
}


export function APIRemoveUnit(token, id) {
	return fetch(baseUrl + '/api/patients/units/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
		}
	})
	.then((response) => response)
	.catch((error) => error)
}