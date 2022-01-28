import { useState, useEffect } from 'react';

import { pageFeedUtils } from './pageFeedUtils';

const { fetchThreads } = pageFeedUtils;

export default function HomePageFeed() {
  const [threads, setThreads] = useState(null);

  useEffect(() => {
    if (!threads) {
      (async () => {
        const { data } = await fetchThreads(1, 3);
        setThreads(data);
      })();
    }
  });

  console.log(threads);

  return <h1>HomePageFeed</h1>;
}
