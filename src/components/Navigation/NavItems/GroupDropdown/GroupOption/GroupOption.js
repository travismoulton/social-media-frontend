import { AiFillAlert } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import classes from './GroupOption.module.css';

export default function GroupOption({ value, label }) {
  return (
    <div className={classes.Wrapper}>
      <AiFillAlert />
      <span className={classes.GroupName}>{label}</span>
      <Link to="/login">Login</Link>
    </div>
  );
}
