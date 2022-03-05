import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://social-backend-123.herokuapp.com/users',
  baseUrl: 'https://api.threddit.win/users',
  timeout: 20000,
  withCredentials: true,
});

export default instance;
