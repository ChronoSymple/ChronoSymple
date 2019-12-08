//const baseUrl = 'http://192.168.0.11:3000'
const baseUrl = 'https://docapp-prod.herokuapp.com'

export function SiginAPatientWithApi (fname, lname, mail, password, civility, birthdate, phonenumber) {
  return fetch(baseUrl + '/api/patients/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: fname,
      last_name: lname,
      email: mail,
      password: password,
      civility: civility,
      birthdate: birthdate,
      phonenumber: phonenumber
    }),
  })
  .then((response) => response)
  .catch((error) => error)
}

export function LoginAPatientWithApi (mail, password) {
  return fetch(baseUrl + '/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: mail,
      password: password
    }),
  })
  .then((response) => response)
  .catch((error) => error)
}

export function LogOutAPatientWithApi (token) {
  return fetch(baseUrl + '/api/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Authorization': token,
    }
  })
  .then((response) => response)
  .catch((error) => error)
}

export function getPatientInfoWithApi (token) {
  return fetch(baseUrl + '/api/patients/profiles', {
    methos: 'GET',
    headers: {
      Accept: 'application/json',
      'Authorization': token,
    },
  })
  .then((response) => response)
  .catch((error) => error)
}

/*
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
*/