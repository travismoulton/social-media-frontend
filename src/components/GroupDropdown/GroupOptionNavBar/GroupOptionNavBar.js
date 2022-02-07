import { AiFillAlert } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

import classes from './GroupOption.module.css';

export default function GroupOptionNavBar({ value, label }) {
  return (
    <div className={classes.Wrapper}>
      <AiFillAlert />
      <Link
        to={{ pathname: `/group/${slugify(label)}`, state: { groupId: value } }}
      >
        {label}
      </Link>
    </div>
  );
}
