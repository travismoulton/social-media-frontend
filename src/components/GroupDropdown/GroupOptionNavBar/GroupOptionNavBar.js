import { AiFillAlert } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

import classes from './GroupOption.module.css';

export default function GroupOptionNavBar({ value, label }) {
  return (
    <Link
      to={{ pathname: `/group/${slugify(label)}`, state: { groupId: value } }}
      className={classes.Link}
    >
      r/{label}
    </Link>
  );
}
