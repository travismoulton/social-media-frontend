import axios from 'axios';

const threadsInstance = axios.create({
  // baseURL: 'https://127.0.0.1:8080/membership/',
  baseURL: '/threads',
  timeout: 20000,
  withCredentials: true,
});

export default threadsInstance;
