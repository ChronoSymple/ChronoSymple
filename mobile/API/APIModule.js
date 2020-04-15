import { stringify } from "qs";

//const baseUrl = 'http://192.168.0.11:3000'
const baseUrl = 'https://docapp-prod.herokuapp.com'
//const baseUrl = 'https://docapp-preprod.herokuapp.com'

export function APIAddModule (token, id) {
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

export function APIAddPatientNotes(token, myTab, idModule) {
	return fetch(baseUrl + '/api/patients/units/' + idModule + '/add_note', {
	  method: 'POST',
	  headers: {
      'Content-Type': 'application/json',			
	    'Authorization': token,
		},
		body: JSON.stringify({
				data: myTab
		})
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIRemovePatientNotes(token, idNote) {
	return fetch(baseUrl + '/api/patients/notes/' + idNote, {
		method: 'DELETE',
		headers: {
      		'Content-Type': 'application/json',			
		    'Authorization': token,
		}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIEditPatientNotes(token, myTab, idNote) {
	return fetch(baseUrl + '/api/patients/notes/' + idNote, {
		method: 'PUT',
		headers: {
      		'Content-Type': 'application/json',	
		    'Authorization': token,
		},
		body: JSON.stringify({
				data: myTab
		})
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

export function APIShareNote(token, module_id, note_ids, doctor_ids) {
		return fetch(baseUrl + '/api/patients/units/' + module_id + '/share_notes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
		}, body: JSON.stringify({
			doctor_ids: doctor_ids,
			note_ids: note_ids
		})
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIgetDoctorsOfModule(token, id) {
	return fetch(baseUrl + '/api/patients/units/' + id + '/doctors', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
		}
	})
	.then((response) => response)
	.catch((error) => error)
}