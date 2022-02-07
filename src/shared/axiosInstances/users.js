import axios from 'axios';

const instance = axios.create({
  baseURL: '/users',
  timeout: 20000,
  withCredentials: true,
});

export default instance;
