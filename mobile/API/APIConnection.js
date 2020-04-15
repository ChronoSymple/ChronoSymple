//const baseUrl = 'http://192.168.0.11:3000'
// const baseUrl = 'https://docapp-preprod.herokuapp.com'
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
      phone_number: phonenumber
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

export function updatePatientPassword (token, oldPassword, newPassword) {
  return fetch(baseUrl + '/api/patients/profiles/change_password', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    }),
  })
  .then((response) => response)
  .catch((error) => error)
}

export function checkPatientPassword(token, password) {
  return fetch(baseUrl + '/api/patients/profiles/check_password', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      password: password,
    }),
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

export function updatePatientProfile(token, name, value, password) {
  content = JSON.stringify({
    password: password
  })
  if (name == "phoneNumber") {
    content = JSON.stringify({
      phone_number: value,
      password: password,
    })
  } else if (name == "email") {
    content = JSON.stringify({
      email: value,
      password: password,
    })
  } else if (name == "picture") {
    content = JSON.stringify({
      picture: value,
      password: password,
    })
  }
  console.log(content)
  return fetch(baseUrl + '/api/patients/profiles/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: content,
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