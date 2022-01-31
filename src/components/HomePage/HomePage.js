import classes from './HomePage.module.css';
import ThreadFeed from '../ThreadFeed/ThreadFeed';

export default function HomePage() {
  return (
    <div
      style={{
        paddingLeft: '30rem',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}
    >
      <ThreadFeed />
    </div>
  );
}
