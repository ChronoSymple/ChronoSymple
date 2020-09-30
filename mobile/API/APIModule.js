import { stringify } from "qs";

const baseUrl = 'https://docapp-prod.herokuapp.com'

export function APIAddModule (token, id) {
	return fetch(baseUrl + '/api/patients/general_units/' + id + '/add' , {
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

export function APIUnshareNote(token, note_id, doctor_ids) {
	return fetch(baseUrl + '/api/patients/notes/' + note_id + '/unshare', {
	method: 'PATCH',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': token,
	}, body: JSON.stringify({
		doctor_ids: doctor_ids,
	})
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIDoctorOfNotes(token, note_id) {
	return fetch(baseUrl + '/api/patients/notes/' + note_id + '/doctors', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': token,
	}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetGeneralUnitId(token, id) {
	return fetch(baseUrl + '/api/patients/units/' + id + '/get_general_unit_id', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': token,
	}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetPatientNotesByDateIntervale(token, beginDate, endDate, idmodule) {
	return fetch(baseUrl + '/api/patients/notes/notes_by_date_interval?begin_date=' + beginDate + "&end_date=" + endDate + "&unit=" + idmodule, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
		}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetGeneralUnitNoteFileds(token, id) {
	return fetch(baseUrl + '/api/patients/general_units/' + id + '/get_note_fileds', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
    .then((response) => response)
    .catch((error) => error)
}

export function APIPatchChangeFilter(token, unit_id, new_filter) {
	return fetch(baseUrl + '/api/patients/units/' + unit_id + '/change_filter', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }, body: JSON.stringify({
		filter: new_filter,
	})
    }).then((response) => response)
    .catch((error) => error)
}

export function APIGetFilter(token, unit_id,) {
	return fetch(baseUrl + '/api/patients/units/' + unit_id + '/get_filter', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    }).then((response) => response)
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

export function APIGetNotesParameters(token, id) {
    return fetch(baseUrl + '/api/patients/general_units/' + id + '/note_model', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
    .then((response) => response)
    .catch((error) => error)
}
