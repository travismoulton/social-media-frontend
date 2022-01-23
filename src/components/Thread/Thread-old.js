import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PostList from '../PostList -- Unused/PostList';
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

    if (post && post.replies.length) {
      post.replies.forEach((reply) => {
        captureReplyChain(reply, replyChain);
      });
    }

    return replyChain;
  }

  function findInnerMostArr(arr) {
    if (!Array.isArray(arr.at(-1))) return arr;
    return findInnerMostArr(arr.at(-1));
  }

  function createPostStructure() {
    const posts = captureReplyChain().splice(1);
    const postsArr = [[captureReplyChain()[0]]];

    posts.forEach((post, i) => {
      const nestLevel = post.ancestors.length;
      const prevNestLevel = i > 0 && posts[i - 1].ancestors.length;

      if (i > 0 && nestLevel > prevNestLevel) {
        const innerMostArr = findInnerMostArr(postsArr);
        innerMostArr.push([post]);
      } else if (nestLevel === 1) {
        postsArr.push([]);
        postsArr.at(-1).push(post);
      } else if (nestLevel < prevNestLevel) {
        function getInsertPoint(arr, nestlevel) {
          if (nestlevel === 0) return arr;
          return getInsertPoint(arr[1], nestlevel - 1);
        }
        const insertPoint = getInsertPoint(postsArr.at(-1), nestLevel - 1);
        insertPoint.push(post);
      } else if (nestLevel === prevNestLevel) {
        const innerMostArr = findInnerMostArr(postsArr);
        innerMostArr.push(post);
      }
    });

    return postsArr;
  }

  const postList =
    initialPost &&
    createPostStructure().map((posts) => (
      <PostList
        posts={posts}
        reloadThread={reloadThread}
        key={`PostList--${posts[0]._id}`}
      />
    ));

  return (
    initialPost && (
      <div className={classes.Wrapper}>
        <div className={classes.Thread}>{postList}</div>
      </div>
    )
  );
}
