import classes from './HomePage.module.css';
import CreatePostBanner from '../CreatePostBanner/CreatePostBanner';
import ThreadFeed from '../ThreadFeed/ThreadFeed';

export default function HomePage() {
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
      <CreatePostBanner />
      <ThreadFeed />
    </div>
  );
}
