import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { postUtils } from '../postUtils';
import OptionsRow from '../OptionsRow/OptionsRow';
import PostDate from '../PostDate/PostDate';
import SubmitReplyBtn from '../SubmitReplyBtn/SubmitReplyBtn';
import ReplyInput from '../ReplyInput/ReplyInput';
import VoteBtns from '../VoteBtns/VoteBtns';
import LoginOrRegister from '../LoginOrRegister/LoginOrRegister';
import EditPostWrapper from '../ReplyWrapper/ReplyWrapper';
import classes from '../Post.module.css';

const { deletePost } = postUtils;

export default function Post({ post, reloadThread, numComments }) {
  const { user } = useSelector((state) => state.auth);
  const [replyContent, setReplyContent] = useState('');
  const [shouldClearReplyInput, setShouldClearReplyInput] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);

  function editBtnHandler() {
    setReplyContent(post.content);
    setInEditMode(true);
  }

  function cancelBtnHandler() {
    setReplyContent('');

    if (inEditMode) setInEditMode(false);
  }

  // Inside the submitReplyBtn, this will be run when a reply is submitted.
  // This will send a flag over the ReplyInput to clear the input value
  function clearReplyInput() {
    setReplyContent('');
    setShouldClearReplyInput(true);
  }

  async function deletePostHandler() {
    await deletePost(post._id);

    reloadThread();
  }

  // This will run after the flag has been sent to ReplyInput and the reply has been deleted
  useEffect(() => {
    if (shouldClearReplyInput) setShouldClearReplyInput(false);
  }, [shouldClearReplyInput]);

  return (
    <>
      <div
        className={`${classes.Post} ${classes.InitialPost}`}
        style={{ marginLeft: '2rem', marginBottom: '3.5rem' }}
      >
        {user && (
          <div className={classes.InitialPostLeft}>
            <VoteBtns post={post} vertical />
          </div>
        )}

        <div className={classes.InitialPostRight}>
          <div className={classes.PostHeader}>
            <p className={classes.Author}>
              {!post.isDeleted ? post.author.name : '[Post deleted by author]'}
            </p>
            <PostDate postTimeStamp={post.createdAt} />
          </div>
          <div className={classes.PostContent}>{post.content}</div>

          <OptionsRow
            user={user}
            editBtnHandler={editBtnHandler}
            post={post}
            forInitialPost
            numComments={numComments}
            deletePostHandler={deletePostHandler}
          />
        </div>
      </div>
      {inEditMode && (
        <EditPostWrapper
          setReplyContent={setReplyContent}
          replyContent={replyContent}
          cancelBtnHandler={cancelBtnHandler}
          post={post}
          closeReplyBox={() => setInEditMode(false)}
          reloadThread={reloadThread}
          inEditMode={inEditMode}
        />
      )}
      {user && !inEditMode && (
        <div className={classes.ReplyWrapper} id="comments">
          <p>
            Comment as <span>{user.name}</span>
          </p>
          <ReplyInput
            setReplyContent={setReplyContent}
            forInitialPost
            shouldClearInput={shouldClearReplyInput}
          />

          <SubmitReplyBtn
            reply={replyContent}
            post={post}
            reloadThread={reloadThread}
            clearReplyInput={clearReplyInput}
            forInitialPost
          />
        </div>
      )}

      {!user && <LoginOrRegister />}
    </>
  );
}
