import { useSelector } from 'react-redux';
import { useState } from 'react';
import { BsChatRightText } from 'react-icons/bs';

import SubmitReplyBtn from './SubmitReplyBtn/SubmitReplyBtn';
import ReplyInput from './ReplyInput/ReplyInput';
import VoteBtns from './VoteBtns/VoteBtns';
import classes from './Post.module.css';

export default function Post({ post }) {
  const { user } = useSelector((state) => state.auth);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  function generateMarginBasedOnNestLevel() {
    const nestLevel = post.ancestors.length;

    const margin = 3 * nestLevel + 1;

    return `${margin.toString()}rem`;
  }

  function calculateTimeSincePost() {
    const postDate = new Date(post.createdAt);

    const now = new Date();

    const timeSincePostInHours = Math.floor((now - postDate) / 1000 / 60 / 60);

    if (timeSincePostInHours < 24)
      return `${timeSincePostInHours.toString()} hrs ago`;

    if (timeSincePostInHours > 24)
      return `${Math.floor(timeSincePostInHours / 24)} days ago`;
  }

  return (
    <div
      className={classes.Post}
      style={{ marginLeft: generateMarginBasedOnNestLevel() }}
    >
      <div className={classes.PostHeader}>
        <p className={classes.Author}>{post.author.name}</p>
        <p className={classes.Date}>{calculateTimeSincePost()}</p>
      </div>
      <div className={classes.PostContent}>{post.content}</div>
      <div className={classes.OptionsRow}>
        {post.author._id !== user._id && <VoteBtns post={post} />}
        <button
          className={classes.ReplyBtn}
          onClick={() => setShowReplyInput((showReplyInput) => !showReplyInput)}
        >
          <BsChatRightText size={16} /> <span> Reply</span>
        </button>
      </div>
      {showReplyInput && (
        <>
          <div className={classes.ReplyWrapper}>
            <ReplyInput setReplyContent={setReplyContent} />
            <SubmitReplyBtn
              reply={replyContent}
              parentPost={post._id}
              threadId={post.thread}
            />
          </div>
        </>
      )}
    </div>
  );
}
