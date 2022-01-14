import classes from './AboutGroup.module.css';

export default function AboutGroup({ group }) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  function formatGroupDateStr() {
    const date = new Date(group.createdAt);

    return `Created ${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  formatGroupDateStr();

  return (
    <div className={classes.Container}>
      <div className={classes.Banner}>
        <p>About {group.name}</p>
      </div>
      <div className={classes.InnerWrapper}>
        <p className={classes.Description}>{group.description}</p>
        <p className={classes.MemberCount}>
          Number of members: {group.memberCount}
        </p>
      </div>
      <div className={classes.BtnAndDateWrapper}>
        <p>{formatGroupDateStr()}</p>
        <button>Create Post</button>
      </div>
    </div>
  );
}
