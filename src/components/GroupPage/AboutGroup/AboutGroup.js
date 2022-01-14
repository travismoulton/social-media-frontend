import classes from './AboutGroup.module.css';

export default function AboutGroup({ group }) {
  return (
    <div className={classes.Container}>
      <div className={classes.Banner}>
        <p>About {group.name}</p>
      </div>
      <div>
        <p className={classes.Description}>group description</p>
        <p className={classes.MemberCount}>group member count</p>
      </div>
      <div className={classes.BtnAndDateWrapper}>
        <p>created at...</p>
        <button>Create Post</button>
      </div>
    </div>
  );
}
