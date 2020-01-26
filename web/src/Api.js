const base = '';
const prefix = `${base}/api`;

const jsonRequest = async(baseUrl, options = {}) => {
  try {
    const req = await fetch(baseUrl, {
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    if (req.status !== 200 && req.status !== 204) {
      throw new Error(`Invalid status code: ${req.status} ${req.statusText}`);
    }
    if (req.headers.get('Content-Type').split(';')[0] === 'application/json') {
      return req.json();
    }
    return req.text();
  }
  catch (e) {
    throw new Error(e);
    //throw new Error('Error with API');
  }
};

const loggedRequest = (baseUrl, token, options = {}) => jsonRequest(baseUrl, {
  ...options,
  headers: {
    ...options.headers,
    'Authorization': token,
  }
});

const login = async(email, password) =>
  jsonRequest(`${prefix}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }).then(res => res.login_token);


const getPatients = token =>
  loggedRequest(`${prefix}/doctors/patients`, token);

const deletePatient = (token, patientID) =>
  loggedRequest(`${prefix}/admins/patients/delete`, token, {
    method: 'POST',
    body: JSON.stringify({id: patientID})
  });

const deleteDoctor = (token, doctorID) =>
  loggedRequest(`${prefix}/admins/doctors/delete`, token, {
    method: 'POST',
    body: JSON.stringify({id: doctorID})
  });

const profileProperties = [
  'first_name',
  'last_name',
  'email',
  'phone_number',
  'birthdate',
  'civility',
  'picture'
];

const updateProfile = async(url, token, profile) => {
  if (typeof(profile) !== 'object' && profile !== null) {
    throw Error('Not an object');
  }
  if (Object.keys(profile).reduce((p, c) => profileProperties.includes(c), true) === false) {
    throw Error('Invalid key in the set');
  }
  if (profile.id !== undefined && typeof(profile.id) !== 'number') {
    throw Error('No ID given');
  }
  await loggedRequest(url, token, {
    method: 'POST',
    body: JSON.stringify(profile)
  });
};

const updatePatient = async(token, patientProfile) =>
  updateProfile(`${prefix}/admins/patients/update`, token, patientProfile);

const updateDoctor = async(token, doctorProfile) =>
  updateProfile(`${prefix}/doctors/profiles/update`, token, doctorProfile);

const getPatientsAsAdmin = (token) =>
  loggedRequest(`${prefix}/admins/patients`, token);

const getDoctorsAsAdmin = (token) =>
  loggedRequest(`${prefix}/admins/doctors`, token);


const getPatient = (token, ID) =>
  loggedRequest(`${prefix}/doctors/patients/profile?id=${ID}`, token);



export default {
  login,
  getPatients,
  deletePatient,
  deleteDoctor,
  updatePatient,
  updateDoctor,
  getPatient,
  getDoctorsAsAdmin,
  getPatientsAsAdmin
};