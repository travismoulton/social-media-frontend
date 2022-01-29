import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ThreadFeed from '../ThreadFeed/ThreadFeed';
import GroupHeader from './GroupHeader/GroupHeader';
import AboutGroup from './AboutGroup/AboutGroup';
import classes from './GroupPage.module.css';
import { groupPageUtils } from './groupPageUtils';

const { fetchGroup } = groupPageUtils;

export default function GroupPage() {
  const history = useHistory();
  const [group, setGroup] = useState(null);

  const { groupId } = history.location.state;

  useEffect(() => {
    if (!group || group._id !== groupId)
      (async () => {
        const {
          data: { group },
        } = await fetchGroup(groupId);

        setGroup(group);
      })();
  }, [group, groupId]);

  return (
    group && (
      <>
        <GroupHeader group={group} />
        <AboutGroup group={group} />
        <div className={classes.PageFeedWrapper}>
          <ThreadFeed groupId={groupId} />
        </div>
      </>
    )
  );
}
