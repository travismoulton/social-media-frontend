import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classes from './ContinueAsGuest.module.css';
import { authStart, authSuccess, authFail } from '../../../../store/authSlice';
import { loginUtils } from '../../../Login/loginUtils';

const { login } = loginUtils;

export default function ContinueAsGuest({ fromNavBar }) {
  const history = useHistory();
  const dispatch = useDispatch();

  async function clickHandler() {
    dispatch(authStart());
    const { data } = await login('guest@guest.com', 'pass1234');

    // data.data contains the user info
    if (data.status === 'success') {
      history.push('/');
      dispatch(authSuccess(data.data));
    } else if (data.status === 'fail') {
      dispatch(authFail());
    }
  }

  const className = fromNavBar
    ? classes.FromNavBar
    : `${'Global-btn-1 ' + classes.Btn}`;

  return (
    <button className={className} onClick={clickHandler}>
      Continue as guest
    </button>
  );
}
