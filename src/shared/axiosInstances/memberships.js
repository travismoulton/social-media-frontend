import axios from 'axios';

const membershipInstance = axios.create({
  // baseURL: 'https://social-backend-123.herokuapp.com/membership',
  baseURL: 'https://api.threddit.win/membership',
  timeout: 20000,
  withCredentials: true,
});

export default membershipInstance;
