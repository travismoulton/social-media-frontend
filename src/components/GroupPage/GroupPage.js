import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import HomePageFeed from '../HomePageFeed/HomePageFeed';
import GroupHeader from './GroupHeader/GroupHeader';
import AboutGroup from './AboutGroup/AboutGroup';
import classes from './GroupPage.module.css';
import { groupPageUtils } from './groupPageUtils';

const { fetchGroup } = groupPageUtils;

export default function GroupPage() {
  const history = useHistory();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const groupId = history.location.state.groupId;

    if (!group || group._id !== groupId)
      (async () => {
        const {
          data: { group },
        } = await fetchGroup(groupId);

        setGroup(group);
      })();
  }, [group, history]);

  // const links =
  //   group &&
  //   group.threads.map((thread) => (
  //     <Link
  //       to={{ pathname: `/thread/${thread.title}`, state: { thread } }}
  //       key={thread._id}
  //     >
  //       {thread.title}
  //     </Link>
  //   ));

  return (
    group && (
      <>
        <GroupHeader group={group} />
        <AboutGroup group={group} />
        <div className={classes.PageFeedWrapper}>
          <HomePageFeed />
        </div>
      </>
    )
  );
}
