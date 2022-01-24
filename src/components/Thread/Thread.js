import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Post from '../Post/Post';
import ReplyChain from '../ReplyChain/ReplyChain';
import classes from './Thread.module.css';
import { threadUtils } from './threadUtils';

const { getIntialPost } = threadUtils;

export default function Thread() {
  const history = useHistory();
  const [thread, setThread] = useState(null);
  const [initialPost, setInitialPost] = useState(null);

  // Upon loading the component, it uses the Thread passed through History
  // and sets it to state
  useEffect(() => {
    const threadFromHistory = history.location.state.thread;

    if (!thread || thread._id !== threadFromHistory._id)
      setThread(threadFromHistory);
  }, [history, thread]);

  // Once there is a thread in State, it uses that Thread's initial post
  // to fetch the reply chain from the API
  useEffect(() => {
    if (thread && !initialPost) {
      (async () => {
        const {
          data: { post },
        } = await getIntialPost(thread.initialPost);

        setInitialPost(post);
      })();
    }
  }, [thread, initialPost]);

  async function reloadThread() {
    const {
      data: { post },
    } = await getIntialPost(thread.initialPost);

    setInitialPost(post);
  }

  function generatePostStructure(postNode = initialPost) {
    // If the post has replies, we need to recursively create nested divs to
    // store the replies in. This creates a tree structre that allows
    // For the hide replies functionality, as all replies to a parent post
    // will be stored in a nested div
    if (postNode.replies.length) {
      const { replies } = postNode;

      return (
        <>
          <Post
            post={postNode}
            key={`Post--${postNode._id}`}
            reloadThread={reloadThread}
          />
          <ReplyChain
            key={`ReplyChain--${postNode._id}`}
            posts={replies.map((reply) => generatePostStructure(reply))}
            reloadThread={reloadThread}
            numPosts={postNode.numAggregateReplies}
          />
        </>
      );
    } else {
      return (
        <Post
          post={postNode}
          key={`Post--${postNode._id}`}
          reloadThread={reloadThread}
        />
      );
    }
  }

  return (
    initialPost && (
      <div className={classes.Wrapper}>
        <div className={classes.Thread}>{generatePostStructure()}</div>
      </div>
    )
  );
}
