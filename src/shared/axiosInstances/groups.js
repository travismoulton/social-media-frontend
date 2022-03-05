import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://social-backend-123.herokuapp.com/groups',
  baseURL: 'https://api.threddit.win/groups',
  timeout: 20000,
  withCredentials: true,
});

export default instance;
