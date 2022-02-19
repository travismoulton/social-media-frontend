import { useSelector } from 'react-redux';

import CreatePostBanner from '../CreatePostBanner/CreatePostBanner';
import ThreadFeed from '../ThreadFeed/ThreadFeed';

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {user && <CreatePostBanner />}
      <ThreadFeed />
    </div>
  );
}
