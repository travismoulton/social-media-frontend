import axios from 'axios';

const postsInstance = axios.create({
  // baseURL: 'https://social-backend-123.herokuapp.com/posts',
  baseURL: 'https://api.threddit.win/posts',
  timeout: 20000,
  withCredentials: true,
});

export default postsInstance;
