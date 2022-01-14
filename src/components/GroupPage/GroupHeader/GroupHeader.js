import classes from './GroupHeader.module.css';
import MembershipBtn from './MembershipBtn/MembershipBtn';

export default function GroupHeader({ group }) {
  return (
    <>
      <div className={classes.Top}></div>
      <div className={classes.Bottom}>
        <h1>{group.name}</h1>
        <MembershipBtn group={group} />
      </div>
    </>
  );
}
