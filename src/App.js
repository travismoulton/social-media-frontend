import { Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import GroupPage from './components/GroupPage/GroupPage';
import CreateThread from './components/CreateThread/CreateThread';

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
      const userToLogin = await checkForUser();
      if (userToLogin) dispatch(authSuccess(userToLogin));
    })();
  }, [dispatch]);

  const routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/group/:groupName/createThread" component={CreateThread} />
      <Route path="/group/:groupName" component={GroupPage} />
    </Switch>
  );

  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
