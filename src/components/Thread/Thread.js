import { useHistory } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import InitialPost from '../Post/InitialPost/InitialPost';
import Post from '../Post/Post';
import ReplyChain from '../ReplyChain/ReplyChain';
import classes from './Thread.module.css';
import { threadUtils } from './threadUtils';

const { fetchInitialPost } = threadUtils;

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
        } = await fetchInitialPost(thread.initialPost);

        setInitialPost(post);
      })();
    }
  }, [thread, initialPost]);

  async function reloadThread() {
    const {
      data: { post },
    } = await fetchInitialPost(thread.initialPost);

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
        <Fragment key={`Fragment--${postNode._id}`}>
          {/* The initialPost is already being rendered into the DOM automatically,
          so skip it on the first iteration of this function */}
          {postNode !== initialPost && (
            <Post
              post={postNode}
              key={`Post--${postNode._id}`}
              reloadThread={reloadThread}
            />
          )}
          <ReplyChain
            key={`ReplyChain--${postNode._id}`}
            posts={replies.map((reply) => generatePostStructure(reply))}
            reloadThread={reloadThread}
            numPosts={postNode.numAggregateReplies}
            forInitialPost={postNode === initialPost}
          />
        </Fragment>
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
        <div className={classes.Thread}>
          <InitialPost
            post={initialPost}
            reloadThread={reloadThread}
            numComments={initialPost.numAggregateReplies}
          />
          {initialPost.replies.length ? generatePostStructure() : null}
        </div>
      </div>
    )
  );
}
