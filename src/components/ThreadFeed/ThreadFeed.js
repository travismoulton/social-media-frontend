import { useState, useEffect, useCallback, useRef } from 'react';

import { threadFeedUtils } from './threadFeedUtils';
import ThreadFeedCard from './ThreadFeedCard/ThreadFeedCard';

const {
  fetchAllThreadsPaginated,
  fetchThreadsByGroupPaginated,
  fetchNextPage,
} = threadFeedUtils;

export default function ThreadFeed({ groupId }) {
  const [threads, setThreads] = useState(null);

  const [limit, setLimit] = useState(6);
  const [nextUrl, setNextUrl] = useState(null);
  const groupRef = useRef(null);

  // If not passed, the groupId prop is undefined. Set it to null so the if check
  // in the useEffect passes
  if (!groupId) groupId = null;

  const updateFeed = useCallback(async () => {
    const { data } = await fetchNextPage(nextUrl);

    setThreads((threads) => threads.concat(data.threads));
    setNextUrl(data.next);
  }, [nextUrl]);

  useEffect(() => {
    function loadNextPaegOnScroll() {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement;

      const scrolledToBottom = scrollHeight - scrollTop === clientHeight;

      // The API will return nextUrl as null if on the last page of results.
      // Don't attempt to fetch the next page if there is no nextUrl
      if (scrolledToBottom && nextUrl) updateFeed();
    }

    document.addEventListener('scroll', loadNextPaegOnScroll);

    return () => document.removeEventListener('scroll', loadNextPaegOnScroll);
  }, [nextUrl, updateFeed]);

  useEffect(() => {
    if (!threads || groupId !== groupRef.current) {
      if (groupId) groupRef.current = groupId;

      // If rendered inside GroupPage, ThreadFeed will be passed a groupId, and will only
      // fetch threads for that group. If rendered on the home page, no groupId will be passed
      // and it will fetch all threads and display them to the home page
      const fetchThreads = groupId
        ? fetchThreadsByGroupPaginated
        : fetchAllThreadsPaginated;

      (async () => {
        const { data } = await fetchThreads(limit, groupId);

        setThreads(data.threads);
        setNextUrl(data.next);
      })();
    }
  }, [threads, groupId, limit]);

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
