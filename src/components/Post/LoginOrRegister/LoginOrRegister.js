import { Link, useHistory } from 'react-router-dom';

import classes from './LoginOrRegister.module.css';

export default function LoginOrRegister() {
  const history = useHistory();

  const threadPath = history.location.pathname;
  const { hash } = history.location;
  const { thread } = history.location.state;

  const loginBtn = (
    <Link
      className={classes.Link}
      to={{ pathname: '/login', state: { threadPath, hash, thread } }}
    >
      Login
    </Link>
  );

  const registerBtn = (
    <Link className={classes.Link} to="/register">
      Register
    </Link>
  );

  return (
    <div className={classes.Wrapper} id="comments">
      <div className={classes.Left}>Login or register to leave a comment</div>
      <div className={classes.Right}>
        {loginBtn} {registerBtn}
      </div>
    </div>
  );
}
