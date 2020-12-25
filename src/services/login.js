import axios from 'axios';

const baseUrl = '/api';

const login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, { username, password });
    return res.data;
  } catch (e) {
    throw e;
  }

};

const logout = async () => {
  try {
    window.localStorage.removeItem('loggedInUser');
  } catch (e) {
    console.log(e);
  }
};

export default {
  login,
  logout,
};