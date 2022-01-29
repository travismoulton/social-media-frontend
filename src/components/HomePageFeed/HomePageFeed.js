import { useState, useEffect } from 'react';

import { pageFeedUtils } from './pageFeedUtils';
import PageFeedCard from './PageFeedCard/PageFeedCard';

const { fetchPaginatedThreads } = pageFeedUtils;

export default function HomePageFeed() {
  const [threads, setThreads] = useState(null);

  useEffect(() => {
    if (!threads) {
      (async () => {
        const { data } = await fetchPaginatedThreads(1, 10);
        setThreads(data);
      })();
    }
  });

  const cards =
    threads &&
    threads.map((thread) => (
      <PageFeedCard
        post={thread.initialPost}
        thread={thread}
        key={thread._id}
      />
    ));

  return <div>{cards}</div>;
}
