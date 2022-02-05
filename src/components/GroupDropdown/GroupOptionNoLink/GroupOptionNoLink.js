import { AiFillAlert } from 'react-icons/ai';

import classes from '../GroupOptionWithLink/GroupOption.module.css';

export default function GroupOption({ value, label }) {
  return (
    <div className={classes.Wrapper}>
      <AiFillAlert />
      {label}
    </div>
  );
}
