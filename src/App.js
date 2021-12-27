import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import axios from './shared/axiosInstances/auth';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  async function login(e) {
    e.preventDefault();
    await axios.post('user/login', { email, password }).then(({ data }) => {
      console.log(data);
      // setCookie('jwt', data.token, {
      //   sameSite: 'None',
      //   secure: true,
      //   path: '/',
      // });
    });
    console.log('fingers crossed');
  }

  async function getPost() {
    await axios
      .get('posts/61c351e705137531ce817834', {
        withCredentials: true,
      })
      .then(({ data }) => console.log(data));
  }

  async function logout() {
    await axios.get('/user/logout');
  }

  return (
    <>
      {' '}
      <form>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </form>
      <button onClick={logout}>Logout</button>
      <button onClick={getPost}>Get post</button>
    </>
  );
}

export default App;
