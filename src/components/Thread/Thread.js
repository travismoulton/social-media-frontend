import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Post from '../Post/Post';
import classes from './Thread.module.css';
import { threadUtils } from './threadUtils';

const { getIntialPost } = threadUtils;

export default function Thread() {
  const history = useHistory();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const threadFromHistory = history.location.state.thread;

    if (!thread || thread._id !== threadFromHistory._id)
      setThread(threadFromHistory);
  }, [history, thread]);

  useEffect(() => {
    // TODO: This will need to change
    if (thread && !posts) {
      (async () => {
        const {
          data: { Post: post },
        } = await getIntialPost(thread.initialPost);

        setPosts(post);
      })();
    }
  }, [thread, posts]);

  return (
    posts && (
      <div className={classes.Wrapper}>
        <div className={classes.Thread}>
          <Post post={posts} />
        </div>
      </div>
    )
  );
}
