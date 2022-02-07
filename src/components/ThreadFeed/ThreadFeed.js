import { useState, useEffect, useCallback, useRef } from 'react';

import { threadFeedUtils } from './threadFeedUtils';
import FeedSortBanner from './FeedSortBanner/FeedSortBanner';
import ThreadFeedCard from './ThreadFeedCard/ThreadFeedCard';
import Spinner from '../UI/Spinner/Spinner';

const {
  fetchAllThreadsPaginated,
  fetchThreadsByGroupPaginated,
  fetchNextPage,
} = threadFeedUtils;

export default function ThreadFeed({ groupId }) {
  const [threads, setThreads] = useState(null);

  const [nextUrl, setNextUrl] = useState(null);

  const [sortBy, setSortBy] = useState('-likeScore,createdAt');
  const groupRef = useRef(null);
  const sortRef = useRef('-likeScore,createdAt');

  // If not passed, the groupId prop is undefined. Set it to null so the if check
  // in the useEffect passes
  if (!groupId) groupId = null;

  const updateFeed = useCallback(async () => {
    const { data } = await fetchNextPage(nextUrl);

    setThreads((threads) => threads.concat(data.threads));
    setNextUrl(data.next);
  }, [nextUrl]);

  // PROBABLY DON'T WANT THIS IN PRODUCTION. IF THE USER ZOOMS OUT OF THE BROWSER, AND THERFORE
  // CHANGES THE RENDER HEIGHT ON THE PAGE CARDS THIS WILL BREAK THE PAGINATION FUNCTIONALITY
  // useEffect(() => {
  //   function setLimitBasedOnScreenSize() {
  //     const { innerHeight } = window;

  //     // Each thread feed card is 200px tall, so only load enough to
  //     // put one overflowing vertically
  //     setLimit(innerHeight / 200 + 1);
  //   }

  //   setLimitBasedOnScreenSize();
  // });

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
        const { data } = await fetchThreads(sortBy, groupId);

        setThreads(data.threads);
        setNextUrl(data.next);
      })();
    }
  }, [threads, groupId, sortBy]);

  // In the FeedSortBanner, when a user toggles to change the sort order, it will update this
  // component's sortBy state. When that happens, this useEffect will trigger. threads is set to
  // null to trigger the useEffect will then fetch the threads with the new sort order
  useEffect(() => {
    if (sortBy !== sortRef.current) {
      sortRef.current = sortBy;
      setThreads(null);
    }
  }, [sortRef, sortBy]);

  const cards =
    threads &&
    threads.map((thread) => (
      <ThreadFeedCard
        post={thread.initialPost}
        thread={thread}
        key={thread._id}
      />
    ));

  return threads ? (
    <div>
      <FeedSortBanner
        updateSortOrder={(sortOrder) => setSortBy(sortOrder)}
        currentSortOrder={sortBy}
      />
      {cards}
    </div>
  ) : (
    <Spinner />
  );
}
