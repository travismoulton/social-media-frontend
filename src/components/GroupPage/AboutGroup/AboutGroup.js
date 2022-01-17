import { Link } from 'react-router-dom';
import slugify from 'slugify';

import classes from './AboutGroup.module.css';

export default function AboutGroup({ group, top, inPostCreation }) {
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
    <div className={classes.Container} style={{ top: top }}>
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
        <div className={`Global-btn-1 ${classes.CreatePostBtn}`}>
          <Link
            className={classes.Link}
            to={{
              pathname: `/group/${slugify(group.name)}/createThread`,
              state: { group },
            }}
          >
            Create Post
          </Link>
        </div>
      </div>
    </div>
  );
}
