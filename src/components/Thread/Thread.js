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
    if (thread && !initialPost) {
      (async () => {
        const {
          data: { Post: post },
        } = await getIntialPost(thread.initialPost);

        setInitialPost(post);
      })();
    }
  }, [thread, initialPost]);

  async function reloadThread() {
    const {
      data: { Post: post },
    } = await getIntialPost(thread.initialPost);

    setInitialPost(post);
  }

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
    captureReplyChain().map((post) => (
      <Post post={post} key={post.id} reloadThread={reloadThread} />
    ));

  function findNestedArr(arr) {
    if (!Array.isArray(arr.at(-1))) return arr;
    return findNestedArr(arr.at(-1));
  }

  function renderPosts() {
    const posts = captureReplyChain().splice(1);
    const postsArr = [captureReplyChain()[0], []];

    console.log(captureReplyChain());

    posts.forEach((post, i) => {
      const nestLevel = post.ancestors.length;
      const prevNestLevel = i > 0 && posts[i - 1].ancestors.length;

      if (nestLevel > prevNestLevel) {
        const insertPoint = findNestedArr(postsArr);
        insertPoint.push([post]);
      } else if (nestLevel === 1) {
        postsArr.push([]);
        postsArr.at(-1).push(post);
      } else if (nestLevel < prevNestLevel) {
        postsArr.at(-1).push(post);
      } else if (nestLevel === prevNestLevel) {
        const insertPoint = findNestedArr(postsArr);
        insertPoint.push(post);
      }
    });

    return postsArr;
  }

  initialPost && console.log(renderPosts());

  return (
    initialPost && (
      <div className={classes.Wrapper}>
        <div className={classes.Thread}>{renderedPosts}</div>
      </div>
    )
  );
}

// const x = 3;

// if (x === 3) {
//   console.log('yay');
// } else if (x < 4) {
//   console.log('yay again');
// }
