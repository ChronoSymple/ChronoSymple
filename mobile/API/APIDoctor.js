const baseUrl = 'https://docapp-prod.herokuapp.com'

export function APIAddDoctor (token, id) {
	return fetch(baseUrl + '/api/patients/units/' + id +"/add_doctor" , {
		method: 'PATCH',		
		headers: {
	    'Authorization': token
		}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIRemoveDoctor (token, id) {
	return fetch(baseUrl + '/api/patients/units/' + id +"/remove_doctor" , {
		method: 'PATCH',		
		headers: {
	    'Authorization': token
		}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetDoctors(token) {
	return fetch(baseUrl + '/api/patients/doctors', {
	  method: 'GET',
	  headers: {
	    Accept: 'application/json',
	    'Authorization': token,
	  },
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetMyDoctors(token) {
	return fetch(baseUrl + '/api/patients/doctors/my_doctors', {
	  method: 'GET',
	  headers: {
	    Accept: 'application/json',
	    'Authorization': token,
	  },
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetDoctorProfile(token, id) {
	return fetch(baseUrl + '/api/patients/doctors/profile?' + id, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Authorization': token,
		},
	})
	.then((response) => response)
	.catch((error) => error)
}