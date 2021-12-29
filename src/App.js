import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import axios from './shared/axiosInstances/users';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';

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

  return <Layout>{routes}</Layout>;
}

export default App;
