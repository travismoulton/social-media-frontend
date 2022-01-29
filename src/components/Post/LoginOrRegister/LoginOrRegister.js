import { Link } from 'react-router-dom';

import classes from './LoginOrRegister.module.css';

export default function LoginOrRegister() {
  const loginBtn = (
    <Link className={classes.Link} to="/login">
      Login
    </Link>
  );

  const registerBtn = (
    <Link className={classes.Link} to="/register">
      Register
    </Link>
  );
}
