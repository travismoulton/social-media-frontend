import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiArrowUp } from 'react-icons/fi';
import { FiArrowDown } from 'react-icons/fi';

import classes from './VoteBtns.module.css';
import { voteBtnUtils } from './voteBtnUtils';

const { addDislike, addLike, removeDislike, removeLike } = voteBtnUtils;

export default function VoteBtns({ post: postData, vertical }) {
  const [post, setPost] = useState(postData);
  const { user } = useSelector((state) => state.auth);

  async function likeHandler() {
    // If the user already likes the post:
    if (post.usersLiked.includes(user._id)) {
      // 1: Make an API call to remove the like from the database
      const { data } = await removeLike(post._id);
      setPost(data.post);

      // const userIndex = post.usersLiked.indexOf(user._id);

      // setPost({
      //   ...post,
      //   usersLiked: post.usersLiked
      //     .splice(0, userIndex)
      //     .concat(post.usersLiked.splice(userIndex + 1)),
      //   likeScore: post.likeScore - 1,
      // });
    } else {
      const { data } = await addLike(post._id);
      setPost(data.post);

      // if (post.usersDisliked.includes(user._id)) {
      //   const userIndex = post.usersDisliked.indexOf(user._id);

      //   setPost({
      //     ...post,

      //     usersLiked: [...post.usersLiked, user._id],
      //     usersDisliked: post.usersDisliked
      //       .splice(0, userIndex)
      //       .concat(post.usersDisliked.splice(userIndex + 1)),
      //     likeScore: post.likeScore + 2,
      //   });
      // } else {
      //   setPost({
      //     ...post,
      //     likeScore: post.likeScore + 1,
      //     usersLiked: [...post.usersLiked, user._id],
      //   });
      // }
    }
  }

  async function dislikeHandler() {
    if (post.usersDisliked.includes(user._id)) {
      const { data } = await removeDislike(post._id);
      setPost(data.post);

      // const userIndex = post.usersDisliked.indexOf(user._id);

      // setPost({
      //   ...post,
      //   usersDisliked: post.usersDisliked
      //     .splice(0, userIndex)
      //     .concat(post.usersDisliked.splice(userIndex + 1)),
      //   likeScore: post.likeScore - 1,
      // });
    } else {
      const { data } = await addDislike(post._id);
      setPost(data.post);

      // // If the user likes the post already, we need to modify the likeCount,
      // //  and usersLiked properties as well as the dislikeCount and usersDisliked
      // if (post.usersLiked.includes(user._id)) {
      //   const userIndex = post.usersLiked.indexOf(user._id);

      //   setPost({
      //     ...post,
      //     usersDisliked: [...post.usersDisliked, user._id],
      //     usersLiked: post.usersLiked
      //       .splice(0, userIndex)
      //       .concat(post.usersLiked.splice(userIndex + 1)),
      //     likeScore: post.likeScore - 2,
      //   });
      // } else {
      //   setPost({
      //     ...post,
      //     likeScore: post.likeScore - 1,
      //     usersDisliked: [...post.usersDisliked, user._id],
      //   });
      // }
    }
  }

  function createVoteCountDisplayOutput() {
    const { usersDisliked, usersLiked, likeScore } = post;

    const userHasNotVoted =
      !usersDisliked.includes(user._id) && !usersLiked.includes(user._id);

    if (userHasNotVoted) {
      if (likeScore === 0) return 'Vote';
      if (likeScore !== 0) return likeScore;
    } else {
      return likeScore;
    }
  }

  return (
    <span
      data-testid="VoteBtns"
      className={`${classes.Vote} ${vertical && classes.Vertical}`}
    >
      <button className={classes.VoteBtn} onClick={likeHandler}>
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
      <button className={classes.VoteBtn} onClick={dislikeHandler}>
        <FiArrowDown
          size={20}
          color={post.usersDisliked.includes(user._id) ? 'blue' : 'black'}
        />
      </button>
    </span>
  );
}
