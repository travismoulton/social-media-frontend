import { useSelector } from 'react-redux';

import classes from './GroupHeader.module.css';
import MembershipBtn from './MembershipBtn/MembershipBtn';

export default function GroupHeader({ group }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className={classes.Top}></div>
      <div className={classes.Bottom}>
        <h1>{group.name}</h1>
        {user && <MembershipBtn group={group} />}
      </div>
    </>
  );
}
