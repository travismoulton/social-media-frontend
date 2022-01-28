import { useSelector } from 'react-redux';
import { useState } from 'react';
import { BsChatRightText } from 'react-icons/bs';

import PostDate from './PostDate/PostDate';
import SubmitReplyBtn from './SubmitReplyBtn/SubmitReplyBtn';
import ReplyInput from './ReplyInput/ReplyInput';
import VoteBtns from './VoteBtns/VoteBtns';
import classes from './Post.module.css';

export default function Post({ post, reloadThread }) {
  const { user } = useSelector((state) => state.auth);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');


  return (
    <div className={classes.Post} style={{ marginLeft: '2rem' }}>
      <div className={classes.PostHeader}>
        <p className={classes.Author}>{post.author.name}</p>
        <PostDate postTimeStamp={post.createdAt} />
      </div>
      <div className={classes.PostContent}>{post.content}</div>
      <div className={classes.OptionsRow}>
        {post.author._id !== user._id && <VoteBtns post={post} />}
        <button
          className={classes.ReplyBtn}
          onClick={() => setShowReplyInput((showReplyInput) => !showReplyInput)}
        >
          <BsChatRightText size={16} /> <span>Reply</span>
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
              closeReplyBox={() => setShowReplyInput(false)}
              reloadThread={reloadThread}
            />
          </div>
        </>
      )}
    </div>
  );
}
