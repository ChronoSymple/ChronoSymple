const base = '';
const prefix = `${base}/api`;
const loginUrl = `${prefix}/login`;
const doctorUrl = `${prefix}/doctors`;
const patientsUrl = `${doctorUrl}/patients`;

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
    if (req.status !== 200) {
      throw new Error(`Invalid status code: ${req.status} ${req.statusText}`);
    }
    return req.json();
  }
  catch (e) {
    throw new Error('Error with API');
  }
};

const loggedRequest = async(baseUrl, token, options = {}) => 
  await(jsonRequest(baseUrl, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': token,
    }
  }));

const login = async(email, password) => {
  const res = await jsonRequest(loginUrl, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return res.login_token;
};

const getPatients = async token => await loggedRequest(patientsUrl, token);

export default {
  login,
  getPatients,
};