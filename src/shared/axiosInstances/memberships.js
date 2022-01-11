import axios from 'axios';

const membershipInstance = axios.create({
  baseURL: 'https://127.0.0.1:8080/membership/',
  timeout: 5000,
  withCredentials: true,
});

export default membershipInstance;
