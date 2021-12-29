import { Switch, Route } from 'react-router-dom';

import './App.css';
import axios from './shared/axiosInstances/users';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Layout from './components/Layout/Layout';

function App() {
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
      <Route path="/logout" component={Logout} />
    </Switch>
  );

  return <Layout>{routes}</Layout>;
}

export default App;
