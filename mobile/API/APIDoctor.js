const baseUrl = 'https://docapp-prod.herokuapp.com'
// const baseUrl = 'https://docapp-preprod.herokuapp.com'

export function APIAddDoctor (token, moduleId, id) {
	return fetch(baseUrl + '/api/patients/units/' + moduleId +"/add_doctor?" + "doctor_id=" + id , {
		method: 'PATCH',		
		headers: {
	    'Authorization': token,
		}
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIRemoveDoctor (token, moduleId, id) {
	return fetch(baseUrl + '/api/patients/units/' + moduleId +"/remove_doctor?" +  "doctor_id=" + id , {
		method: 'PATCH',		
		headers: {
	    'Authorization': token,
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
	return fetch(baseUrl + '/api/patients/doctors/' + id + '/profile', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Authorization': token,
		},
	})
	.then((response) => response)
	.catch((error) => error)
}

export function APIGetDoctorsInModule(token, id) {
	return fetch(baseUrl + '/api/patients/general_units/' + id + '/doctors', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Authorization': token,
		},
	})
	.then((response) => response)
	.catch((error) => error)
}