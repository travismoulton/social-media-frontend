import axios from 'axios';

const instance = axios.create({
  baseURL: `http://127.0.0.1:8080/users/`,
  timeout: 5000,
  withCredentials: true,
});

export default instance;
