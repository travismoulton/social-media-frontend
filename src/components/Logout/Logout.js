import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { authLogout } from '../../store/authSlice';
import { logoutUtils } from './logoutUtils';

const { logout } = logoutUtils;

export default function Logout() {
  const dispatch = useDispatch();

  async function logoutAndUpdateStore() {
    const { status } = await logout();
    if (status === 'success') {
      dispatch(authLogout());
    }
  }

  useEffect(() => {
    (async () => {
      await logoutAndUpdateStore();
    })();
  });

  return <Redirect to="/" />;
}
