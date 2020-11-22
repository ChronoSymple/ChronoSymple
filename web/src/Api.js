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
  });


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

const getNotes = token =>
  loggedRequest(`${prefix}/doctors/notes`, token);

const getPatientNotes = (token, patient) =>
  loggedRequest(`${prefix}/doctors/patients/${patient}/units`, token);

const sendMail = (token, message) => loggedRequest(`${prefix}/send_mail_from_doctor`, token, {
  method: 'POST',
  body: JSON.stringify(message)
});

const getNotesByDateInterval = (token, unit, begin = new Date(0), end = new Date()) => {
  end.setFullYear(end.getFullYear() + 1);
  const formatDate = date => {
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(date);
    return `${da}/${mo}/${ye}`;
  };
  return loggedRequest(`${prefix}/doctors/notes/notes_by_date_interval?begin_date=${formatDate(begin)}&end_date=${formatDate(end)}&unit=${unit}`, token);
};

const myProfileProperties = [...profileProperties, 'password'];

const updateProfile = async(url, token, profile, authorized, idRequired) => {
  if (typeof(profile) !== 'object' && profile !== null) {
    throw Error('Not an object');
  }
  if (Object.keys(profile).reduce((p, c) => authorized.includes(c), true) === false) {
    throw Error('Invalid key in the set');
  }
  if (idRequired && (profile.id === undefined || typeof(profile.id) !== 'number')) {
    throw Error('No ID given');
  }
  return await loggedRequest(url, token, {
    method: 'POST',
    body: JSON.stringify(profile)
  });
};

const getMyProfile = token =>
  loggedRequest(`${prefix}/doctors/profiles`, token);

const updateMyProfile = async(token, profile) =>
  updateProfile(`${prefix}/doctors/profiles/update`, token, profile, myProfileProperties, false);

const updatePatient = async(token, patientProfile) =>
  updateProfile(`${prefix}/admins/patients/update`, token, patientProfile, profileProperties, true);

const updateDoctor = async(token, doctorProfile) =>
  updateProfile(`${prefix}/admins/doctors/update`, token, doctorProfile, profileProperties, true);

const getPatientsAsAdmin = token =>
  loggedRequest(`${prefix}/admins/patients`, token);

const getDoctorsAsAdmin = token =>
  loggedRequest(`${prefix}/admins/doctors`, token);

const getPatient = (token, ID) =>
  loggedRequest(`${prefix}/doctors/patients/${ID}/profile`, token);

const getLimits = (token, unitID) =>
  loggedRequest(`${prefix}/doctors/units/${unitID}/get_fields_limits`, token);

const setLimits = (token, unitID, obj) =>
  loggedRequest(`${prefix}/doctors/units/${unitID}/set_fields_limits`, token, {
    method: 'POST',
    body: JSON.stringify(obj)
  });

const getGeneralUnits = token =>
  loggedRequest(`${prefix}/admins/general_units`, token);

const getDoctorUnits = (token, doctorID) =>
  loggedRequest(`${prefix}/admins/doctors/${doctorID}/units`, token);

const addDoctorUnit = (token, doctorID, unit) =>
  loggedRequest(`${prefix}/admins/doctors/${doctorID}/add_unit`, token, {
    method: 'PATCH',
    body: JSON.stringify({'unit_id': unit}),
  });

const removeDoctorUnit = (token, doctorID, unit) =>
  loggedRequest(`${prefix}/admins/doctors/${doctorID}/remove_unit`, token, {
    method: 'PATCH',
    body: JSON.stringify({'unit_id': unit}),
  });

const getPatientUnits = (token, patientID) =>
  loggedRequest(`${prefix}/admins/patients/${patientID}/units`, token);

const addPatientUnit = (token, patientID, unit) =>
  loggedRequest(`${prefix}/admins/patients/${patientID}/add_unit`, token, {
    method: 'PATCH',
    body: JSON.stringify({'unit_id': unit}),
  });

const removePatientUnit = (token, patientID, unit) =>
  loggedRequest(`${prefix}/admins/patients/${patientID}/remove_unit`, token, {
    method: 'PATCH',
    body: JSON.stringify({'unit_id': unit}),
  });

const adminCreateDoctor = (token, info) =>
  loggedRequest(`${prefix}/admins/doctors/create`, token, {
    method: 'PATCH',
    body: JSON.stringify(info),
  });


export default {
  login,
  getPatients,
  deletePatient,
  deleteDoctor,
  updatePatient,
  updateDoctor,
  getPatient,
  getDoctorsAsAdmin,
  getPatientsAsAdmin,
  updateMyProfile,
  getMyProfile,
  getNotes,
  getNotesByDateInterval,
  getPatientNotes,
  sendMail,
  getLimits,
  setLimits,
  getGeneralUnits,
  getDoctorUnits,
  addDoctorUnit,
  removeDoctorUnit,
  getPatientUnits,
  addPatientUnit,
  removePatientUnit,
  adminCreateDoctor,
};