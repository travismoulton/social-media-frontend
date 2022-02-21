import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FiArrowUp } from 'react-icons/fi';
import { FiArrowDown } from 'react-icons/fi';

import classes from './VoteBtns.module.css';
import { voteBtnUtils } from './voteBtnUtils';

const { addDislike, addLike, removeDislike, removeLike } = voteBtnUtils;

export default function VoteBtns({ post: postData, vertical, threadScore }) {
  const [post, setPost] = useState(postData);
  const { user } = useSelector((state) => state.auth);
  const threadScoreRef = useRef(threadScore);

  function incrementThreadScore() {
    if (post.usersDisliked.includes(user._id)) {
      threadScoreRef.current += 2;
    } else {
      threadScoreRef.current += 1;
    }
  }

  function decrementThreadScore() {
    if (post.usersLiked.includes(user._id)) {
      threadScoreRef.current -= 2;
    } else {
      threadScoreRef.current -= 1;
    }
  }

  async function likeHandler() {
    if (post.usersLiked.includes(user._id)) {
      // Update ThreadScoreRef before state update so that is rendered properly
      // after state update causes componenet rerender
      if (threadScore) decrementThreadScore();

      const { data } = await removeLike(post._id);
      setPost(data.post);
    } else {
      if (threadScore) incrementThreadScore();

      const { data } = await addLike(post._id);
      setPost(data.post);
    }
  }

  async function dislikeHandler() {
    if (post.usersDisliked.includes(user._id)) {
      if (threadScore) incrementThreadScore();

      const { data } = await removeDislike(post._id);
      setPost(data.post);
    } else {
      if (threadScore) decrementThreadScore();

      const { data } = await addDislike(post._id);
      setPost(data.post);
    }
  }

  function createVoteCountDisplayOutput() {
    const { usersDisliked, usersLiked, likeScore } = post;

    const userHasNotVoted =
      !usersDisliked.includes(user._id) && !usersLiked.includes(user._id);

    // If the component is rendered from ThreadFeedCard, it will be passed a threadSccore, which
    // should be displayed. Otherwise, it should display the post likeScore
    if (userHasNotVoted) {
      if (likeScore === 0) return 'Vote';
      if (likeScore !== 0)
        return threadScore ? threadScoreRef.current : likeScore;
    } else {
      return threadScore ? threadScoreRef.current : likeScore;
    }
  }

  return (
    <span
      data-testid="VoteBtns"
      className={`${classes.Vote} ${vertical && classes.Vertical}`}
    >
      <button
        data-testid="upVote"
        className={classes.VoteBtn}
        onClick={likeHandler}
      >
        <FiArrowUp
          size={20}
          color={post.usersLiked.includes(user._id) ? 'red' : 'black'}
        />
      </button>
      <p
        className={classes.LikesCount}
        style={{
          color: post.usersLiked.includes(user._id)
            ? 'red'
            : post.usersDisliked.includes(user._id)
            ? 'blue'
            : 'black',
        }}
      >
        {createVoteCountDisplayOutput()}
      </p>
      <button
        data-testid="downVote"
        className={classes.VoteBtn}
        onClick={dislikeHandler}
      >
        <FiArrowDown
          size={20}
          color={post.usersDisliked.includes(user._id) ? 'blue' : 'black'}
        />
      </button>
    </span>
  );
}
