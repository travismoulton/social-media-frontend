import axios from 'axios';

const instance = axios.create({
  baseURL: '/groups',
  timeout: 20000,
  withCredentials: true,
});

export default instance;
