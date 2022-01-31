import { useState, useEffect, useCallback, useRef } from 'react';

import { threadFeedUtils } from './threadFeedUtils';
import ThreadFeedCard from './ThreadFeedCard/ThreadFeedCard';

const { fetchAllThreadsPaginated, fetchThreadsByGroupPaginated } =
  threadFeedUtils;

export default function ThreadFeed({ groupId }) {
  const [threads, setThreads] = useState(null);
  const groupRef = useRef(null);

  // If not passed, the groupId prop is undefined. Set it to null so the if check
  // in the useEffect passes
  if (!groupId) groupId = null;

  const fetchAllThreads = useCallback(async () => {
    const { data } = await fetchAllThreadsPaginated(1, 10);
    return data;
  }, []);

  const fetchThreadsByGroup = useCallback(async () => {
    const { data } = await fetchThreadsByGroupPaginated(1, 10, groupId);
    return data;
  }, [groupId]);

  useEffect(() => {
    if (!threads || groupId !== groupRef.current) {
      if (groupId) groupRef.current = groupId;

      // If rendered inside GroupPage, ThreadFeed will be passed a groupId, and will only
      // fetch threads for that group. If rendered on the home page, no groupId will be passed
      // and it will fetch all threads and display them to the home page
      const fetchThreads = groupId ? fetchThreadsByGroup : fetchAllThreads;
      (async () => {
        const data = await fetchThreads(1, 10, groupId);
        setThreads(data);
      })();
    }
  }, [threads, fetchAllThreads, fetchThreadsByGroup, groupId]);

  const cards =
    threads &&
    threads.map((thread) => (
      <ThreadFeedCard
        post={thread.initialPost}
        thread={thread}
        key={thread._id}
      />
    ));

  return <div>{cards}</div>;
}
