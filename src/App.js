import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import GroupPage from './components/GroupPage/GroupPage';
import Thread from './components/Thread/Thread';
import CreateThread from './components/CreateThread/CreateThread';
import HomePage from './components/HomePage/HomePage';

import { authSuccess } from './store/authSlice';
import { appUtils } from './appUtils';

const { checkForUser } = appUtils;

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      // When the app is loaded, checkForUser will send a request to the API
      // If there is a valid token on the request, coresponding user data will
      // be sent back, and set in the store.
      const userToLogin = await checkForUser();
      if (userToLogin) dispatch(authSuccess(userToLogin));

      setLoading(false);
    })();
  }, [dispatch]);

  // Anytime the user logs in or out, this will trigger
  // and set isAuthenitcated state appropriatley
  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/group/:groupName/createThread" component={CreateThread} />
      <Route path="/group/:groupName" component={GroupPage} />
      <Route path="/thread/:threadName" component={Thread} />
      <Route path="/createThread" component={CreateThread} />
      <Route path="/" component={HomePage} />
    </Switch>
  );

  return (
    <div className="App">
      {!loading && <Layout isAuthenticated={isAuthenticated}>{routes}</Layout>}
    </div>
  );
}

export default App;
