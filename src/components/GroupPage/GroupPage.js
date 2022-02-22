import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ThreadFeed from '../ThreadFeed/ThreadFeed';
import GroupHeader from './GroupHeader/GroupHeader';
import AboutGroup from './AboutGroup/AboutGroup';
import CreatePostBanner from '../CreatePostBanner/CreatePostBanner';
import classes from './GroupPage.module.css';
import { groupPageUtils } from './groupPageUtils';

const { fetchGroup } = groupPageUtils;

export default function GroupPage() {
  const history = useHistory();
  const [group, setGroup] = useState(null);
  const { user } = useSelector((state) => state.auth);

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
        <AboutGroup group={group} GroupPage />

        <div className={classes.PageFeedWrapper}>
          {user && <CreatePostBanner group={group} />}
          <ThreadFeed groupId={groupId} />
        </div>
      </>
    )
  );
}
