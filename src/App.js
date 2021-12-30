import { Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Layout from './components/Layout/Layout';
import { authSuccess } from './store/authSlice';
import { appUtils } from './appUtils';

const { checkForUser } = appUtils;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // When the app is loaded, checkForUser will send a request to the API
      // If there is a valid token on the request, coresponding user data will
      // be sent back, and set in the store.
      const user = await checkForUser();
      if (user) dispatch(authSuccess(user));
    })();
  }, [dispatch]);

  const routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </Switch>
  );

  return <Layout>{routes}</Layout>;
}

export default App;
