import { useSelector } from 'react-redux';
import { useState } from 'react';
import { BsChatRightText } from 'react-icons/bs';

import PostDate from '../PostDate/PostDate';
import SubmitReplyBtn from '../SubmitReplyBtn/SubmitReplyBtn';
import ReplyInput from '../ReplyInput/ReplyInput';
import VoteBtns from '../VoteBtns/VoteBtns';
import classes from '../Post.module.css';

export default function Post({ post, reloadThread, numComments }) {
  const { user } = useSelector((state) => state.auth);
  const [replyContent, setReplyContent] = useState('');

  return (
    <>
      <div
        className={classes.Post}
        style={{ marginLeft: '2rem', marginBottom: '3.5rem' }}
      >
        <div className={classes.PostHeader}>
          <p className={classes.Author}>{post.author.name}</p>
          <PostDate postTimeStamp={post.createdAt} />
        </div>
        <div className={classes.PostContent}>{post.content}</div>
        <div className={classes.OptionsRow}>
          <span className={classes.NumComments}>
            <BsChatRightText size={16} /> <span>{numComments} Comments</span>
          </span>
        </div>
      </div>
      <div className={classes.ReplyWrapper}>
        <p>
          Comment as <span>{user.name}</span>
        </p>
        <ReplyInput setReplyContent={setReplyContent} forInitialPost />
        <SubmitReplyBtn
          reply={replyContent}
          parentPost={post._id}
          threadId={post.thread}
          reloadThread={reloadThread}
          forInitialPost
        />
      </div>
    </>
  );
}
