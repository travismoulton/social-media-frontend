import classes from './GroupHeader.module.css';

export default function GroupHeader({ group }) {
  console.log(group);
  return (
    <>
      <div className={classes.Top}></div>
      <div className={classes.Bottom}>
        <h1>{group.name}</h1>
      </div>
    </>
  );
}
