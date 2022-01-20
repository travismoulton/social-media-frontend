import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Post from '../Post/Post';
import classes from './Thread.module.css';
import { threadUtils } from './threadUtils';

const { getIntialPost } = threadUtils;

export default function Thread() {
  const history = useHistory();
  const [thread, setThread] = useState(null);
  const [initialPost, setInitialPost] = useState(null);

  useEffect(() => {
    const threadFromHistory = history.location.state.thread;

    if (!thread || thread._id !== threadFromHistory._id)
      setThread(threadFromHistory);
  }, [history, thread]);

  useEffect(() => {
    // TODO: This will need to change
    if (thread && !initialPost) {
      (async () => {
        const {
          data: { Post: post },
        } = await getIntialPost(thread.initialPost);

        setInitialPost(post);
      })();
    }
  }, [thread, initialPost]);

  function captureReplyChain(post = initialPost, replyChain = []) {
    replyChain.push(post);

    if (post.replies.length) {
      post.replies.forEach((reply) => {
        captureReplyChain(reply, replyChain);
      });
    }

    return replyChain;
  }

  const renderedPosts =
    initialPost &&
    captureReplyChain().map((post) => <Post post={post} key={post.id} />);

  // 1: Start with the intial post
  // 2: Render replies, one by one
  // 3: On each reply, if it has a reply, render it

  return (
    initialPost && (
      <div className={classes.Wrapper}>
        <div className={classes.Thread}>{renderedPosts}</div>
      </div>
    )
  );
}
