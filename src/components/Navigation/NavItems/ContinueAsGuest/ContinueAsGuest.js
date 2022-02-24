import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classes from './ContinueAsGuest.module.css';
import { authStart, authSuccess, authFail } from '../../../../store/authSlice';
import { loginUtils } from '../../../Login/loginUtils';

const { login } = loginUtils;

export default function ContinueAsGuest(props) {
  const { fromNavBar, redirectPath, redirectState } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  console.log({ redirectState, redirectPath });

  async function clickHandler() {
    dispatch(authStart());
    const { data } = await login('guest@guest.com', 'pass1234');

    // data.data contains the user info
    if (data.status === 'success') {
      dispatch(authSuccess(data.data));

      if (redirectPath) {
        history.push(redirectPath, { ...redirectState });
      } else {
        history.push('/');
      }
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
