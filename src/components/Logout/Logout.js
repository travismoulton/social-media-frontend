import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';

import { authLogout } from '../../store/authSlice';
import { logoutUtils } from './logoutUtils';

const { logout } = logoutUtils;

export default function Logout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutAndUpdateStore = useCallback(async () => {
    const { status } = await logout();
    if (status === 'success') {
      dispatch(authLogout());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user)
      (async () => {
        await logoutAndUpdateStore();
      })();
  }, [user, logoutAndUpdateStore]);

  return <Redirect to="/" />;
}
