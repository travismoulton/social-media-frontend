import axios from 'axios';

const instance = axios.create({
  baseURL: '/groups',
  timeout: 5000,
  withCredentials: true,
});

export default instance;
