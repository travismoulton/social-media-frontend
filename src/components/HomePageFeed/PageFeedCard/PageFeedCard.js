import { useSelector } from 'react-redux';
import { useState } from 'react';
import { BsChatRightText } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';

import PostDate from '../../Post/PostDate/PostDate';
import VoteBtns from '../../Post/VoteBtns/VoteBtns';
import postClasses from '../../Post/Post.module.css';
import classes from './PageFeedCard.module.css';

export default function PageFeedCard({ post, thread }) {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const currentUserIsPostAuthor = post.author._id === user._id;

  console.log(thread);

  function redirectToThreadDetail() {
    // The Thread componenet used the initialPost property as the initialPostId
    // To make an API call to fetch all posts
    const threadState = { ...thread, initialPost: thread.initialPost._id };

    history.push(`/thread/${slugify(thread.title)}`, { thread: threadState });
  }

  return (
    <div className={classes.PageFeedCard}>
      <div className={classes.Left}>
        {!currentUserIsPostAuthor && <VoteBtns post={post} vertical />}
      </div>

      <div className={classes.Right} onClick={redirectToThreadDetail}>
        <div className={postClasses.PostHeader}>
          <p className={postClasses.Author}>{post.author.name}</p>
          <PostDate postTimeStamp={post.createdAt} />
        </div>
        <div className={postClasses.PostContent}>{post.content}</div>
        <div className={postClasses.OptionsRow}>
          {/* {post.author._id !== user._id && <VoteBtns post={post} />} */}
          <span className={postClasses.NumComments}>
            <BsChatRightText size={16} />
            <span>{thread.numComments} Comments</span>
          </span>
        </div>
      </div>
    </div>
  );
}
