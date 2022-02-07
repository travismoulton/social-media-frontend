import axios from 'axios';

const postsInstance = axios.create({
  // baseURL: 'https://127.0.0.1:8080/membership/',
  baseURL: '/posts',
  timeout: 20000,
  withCredentials: true,
});

export default postsInstance;
