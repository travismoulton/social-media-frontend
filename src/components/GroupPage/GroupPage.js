import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import GroupHeader from './GroupHeader/GroupHeader';
import AboutGroup from './AboutGroup/AboutGroup';
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
          data: { Group },
        } = await fetchGroup(groupId);

        setGroup(Group);
      })();
  }, [group, history]);

  return (
    group && (
      <>
        <GroupHeader group={group} />
        <AboutGroup group={group} />
      </>
    )
  );
}
