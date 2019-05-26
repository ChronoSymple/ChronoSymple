const base = '';
const prefix = `${base}/api`;
const loginUrl = `${prefix}/login`;
const patientsUrl = `${prefix}/patients`;
const noteUrl = `${patientsUrl}/notes`;

const login = async(email, password) => {
  const res = await fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  if (res.status === 200) {
    const json = await res.json();
    return (json.login_token);
  } else {
    throw new Error('Invalid status number');
  }
};

const getNotes = async token => {
  const req = await fetch(noteUrl, {
    headers: {
      'Authorization': token,
    }
  });
  return req.json();
};

export default {
  login,
  getNotes
};