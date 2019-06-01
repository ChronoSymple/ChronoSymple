const base = '';
const prefix = `${base}/api`;
const loginUrl = `${prefix}/login`;
const patientsUrl = `${prefix}/patients`;
const noteUrl = `${patientsUrl}/notes`;

const jsonRequest = async(baseUrl, options = {}) => {
  try {
    const req = await fetch(noteUrl, {
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
  return await jsonRequest(loginUrl, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
};

const getNotes = async token => await loggedRequest(noteUrl, token);

export default {
  login,
  getNotes
};