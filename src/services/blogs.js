import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token},
  };

  try {
    const res = await axios.post(baseUrl, newBlog, config);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const update = async (newBlogData, id) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const res = await axios.put(`${baseUrl}/${id}`, newBlogData, config);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default { getAll, create, update, setToken };