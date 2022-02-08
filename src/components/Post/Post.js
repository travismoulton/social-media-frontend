import { useSelector } from 'react-redux';
import { useState } from 'react';

import OptionsRow from './OptionsRow/OptionsRow';
import PostDate from './PostDate/PostDate';
import classes from './Post.module.css';
import ReplyWrapper from './ReplyWrapper/ReplyWrapper';

export default function Post({ post, reloadThread }) {
  const { user } = useSelector((state) => state.auth);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [inEditMode, setInEditMode] = useState(false);

  function editBtnHandler() {
    setReplyContent(post.content);
    setInEditMode(true);
    setShowReplyInput(true);
  }

  function cancelBtnHandler() {
    setReplyContent('');
    setShowReplyInput(false);

    if (inEditMode) setInEditMode(false);
  }

  return (
    <div className={classes.Post} style={{ marginLeft: '2rem' }}>
      <div className={classes.PostHeader}>
        <p className={classes.Author}>{post.author.name}</p>
        <PostDate postTimeStamp={post.createdAt} />
      </div>
      <div className={classes.PostContent}>{post.content}</div>
      {!showReplyInput && (
        <OptionsRow
          user={user}
          setShowReplyInput={() => setShowReplyInput(true)}
          editBtnHandler={editBtnHandler}
          post={post}
        />
      )}
      {showReplyInput && (
        <ReplyWrapper
          setReplyContent={setReplyContent}
          replyContent={replyContent}
          cancelBtnHandler={cancelBtnHandler}
          post={post}
          closeReplyBox={() => setShowReplyInput(false)}
          reloadThread={reloadThread}
          inEditMode={inEditMode}
        />
      )}
    </div>
  );
}
