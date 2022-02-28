import { Link } from 'react-router-dom';
import slugify from 'slugify';

import classes from './AboutGroup.module.css';

export default function AboutGroup({ group, GroupPage, inPostCreation }) {
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

  return (
    // Style is for Top is passed as a prop so it can be positioned correctly
    // based on what page it is rendered on
    <div
      className={
        GroupPage ? classes.GroupPageContainer : classes.CreateThreadContainer
      }
    >
      <div className={classes.Banner}>
        <p>About {group.name}</p>
      </div>
      <div className={classes.InnerWrapper}>
        {group.description && (
          <p className={classes.Description}>{group.description}</p>
        )}
        <p className={classes.MemberCount}>
          Number of members: {group.memberCount}
        </p>
      </div>
      <div className={classes.BtnAndDateWrapper}>
        <p>{formatGroupDateStr()}</p>
        {!inPostCreation && (
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
        )}
      </div>
    </div>
  );
}
