import axios from 'axios';

const threadsInstance = axios.create({
  // baseURL: 'https://social-backend-123.herokuapp.com/threads',
  baseURL: 'https://api.threddit.win/threads',
  timeout: 20000,
  withCredentials: true,
});

export default threadsInstance;
