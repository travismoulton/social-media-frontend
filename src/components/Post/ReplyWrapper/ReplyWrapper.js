import classes from '../Post.module.css';
import ReplyInput from '../ReplyInput/ReplyInput';
import SubmitReplyBtn from '../SubmitReplyBtn/SubmitReplyBtn';

export default function ReplyWrapper(props) {
  const {
    setReplyContent,
    replyContent,
    cancelBtnHandler,
    post,
    closeReplyBox,
    reloadThread,
    inEditMode,
  } = props;

  return (
    <div className={classes.ReplyWrapper}>
      <ReplyInput
        setReplyContent={setReplyContent}
        replyContent={replyContent}
      />
      <div className={classes.BtnRow}>
        <button
          style={{ width: '10rem', height: '2.5rem' }}
          className={`Global-btn-1`}
          onClick={cancelBtnHandler}
        >
          Cancel
        </button>

        <SubmitReplyBtn
          reply={replyContent}
          post={post}
          closeReplyBox={closeReplyBox}
          reloadThread={reloadThread}
          inEditMode={inEditMode}
        />
      </div>
    </div>
  );
}
