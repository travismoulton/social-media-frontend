import { AiFillAlert } from 'react-icons/ai';

import classes from '../GroupOptionNavBar/GroupOption.module.css';

export default function GroupOptionCreateThread({ value, label }) {
  return (
    <div className={classes.Wrapper}>
      <AiFillAlert />
      {label}
    </div>
  );
}
