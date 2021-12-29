import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import axios from './shared/axiosInstances/auth';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e) {
    e.preventDefault();
    await axios.post('user/login', { email, password }).then(({ data }) => {
      console.log(data);
    });
    console.log('fingers crossed');
  }

  async function getPost() {
    await axios
      .get('posts/61c351e705137531ce817834')
      .then(({ data }) => console.log(data));
  }

  async function logout() {
    await axios.get('/user/logout').then(({ data }) => console.log(data));
  }

  const routes = (
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  );

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
