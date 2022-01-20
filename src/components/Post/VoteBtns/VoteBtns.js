import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiArrowUp } from 'react-icons/fi';
import { FiArrowDown } from 'react-icons/fi';

import classes from './VoteBtns.module.css';
import { voteBtnUtils } from './voteBtnUtils';

const { addDislike, addLike, removeDislike, removeLike } = voteBtnUtils;

export default function VoteBtns({ post: postData }) {
  const [post, setPost] = useState(postData);
  const { user } = useSelector((state) => state.auth);

  async function likeHandler() {
    if (post.usersLiked.includes(user._id)) {
      await removeLike(post._id);
      const userIndex = post.usersLiked.indexOf(user._id);

      // Remove the userId from post.usersLiked so we don't need to make
      // another API call

      setPost({
        ...post,
        usersLiked: post.usersLiked
          .splice(0, userIndex)
          .concat(post.usersLiked.splice(userIndex + 1)),
        likeCount: post.likeCount - 1,
      });
    } else {
      await addLike(post._id);

      if (post.usersDisliked.includes(user._id)) {
        const userIndex = post.usersDisliked.indexOf(user._id);

        setPost({
          ...post,
          likeCount: post.likeCount + 1,
          usersLiked: [...post.usersLiked, user._id],
          usersDisliked: post.usersDisliked
            .splice(0, userIndex)
            .concat(post.usersDisliked.splice(userIndex + 1)),
          dislikeCount: post.dislikeCount - 1,
        });
      } else {
        setPost({
          ...post,
          likeCount: post.likeCount + 1,
          usersLiked: [...post.usersLiked, user._id],
        });
      }
    }
  }

  async function dislikeHandler() {
    if (post.usersDisliked.includes(user._id)) {
      await removeDislike(post._id);
      const userIndex = post.usersDisliked.indexOf(user._id);

      setPost({
        ...post,
        usersDisliked: post.usersDisliked
          .splice(0, userIndex)
          .concat(post.usersDisliked.splice(userIndex + 1)),
        dislikeCount: post.dislikeCount - 1,
      });
    } else {
      await addDislike(post._id);

      // If the user likes the post already, we need to modify the likeCount,
      //  and usersLiked properties as well as the dislikeCount and usersDisliked
      if (post.usersLiked.includes(user._id)) {
        const userIndex = post.usersLiked.indexOf(user._id);

        setPost({
          ...post,
          dislikeCount: post.dislikeCount + 1,
          usersDisliked: [...post.usersDisliked, user._id],
          usersLiked: post.usersLiked
            .splice(0, userIndex)
            .concat(post.usersLiked.splice(userIndex + 1)),
          likeCount: post.likeCount - 1,
        });
      } else {
        setPost({
          ...post,
          dislikeCount: post.dislikeCount + 1,
          usersDisliked: [...post.usersDisliked, user._id],
        });
      }
    }
  }

  return (
    <>
      <span className={classes.Vote}>
        <button className={classes.VoteBtn} onClick={likeHandler}>
          <FiArrowUp
            size={20}
            color={post.usersLiked.includes(user._id) ? 'red' : 'black'}
          />
        </button>
        <p
          className={classes.LikesCount}
          style={{
            color: post.usersLiked.includes(user._id) ? 'red' : 'black',
          }}
        >
          {post.likeCount > 0 && post.likeCount}
        </p>
      </span>
      <span className={classes.Vote}>
        <button className={classes.VoteBtn} onClick={dislikeHandler}>
          <FiArrowDown
            size={20}
            color={post.usersDisliked.includes(user._id) ? 'red' : 'black'}
          />
        </button>
        <p
          className={classes.LikesCount}
          style={{
            color: post.usersDisliked.includes(user._id) ? 'red' : 'black',
          }}
        >
          {post.dislikeCount > 0 && post.dislikeCount}
        </p>
      </span>
    </>
  );
}
