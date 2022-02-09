import classes from './SubmitReplyBtn.module.css';
import { submitReplyBtnUtils } from './submitReplyBtnUtils';

const { submitReply, editPost } = submitReplyBtnUtils;

export default function SubmitReplyBtn(props) {
  const {
    reply,
    post,
    closeReplyBox,
    reloadThread,
    forInitialPost,
    clearReplyInput,
    inEditMode,
  } = props;

  async function submitHandler() {
    inEditMode
      ? await editPost(reply, post._id)
      : await submitReply(reply, post._id, post.thread);

    forInitialPost && clearReplyInput();

    !forInitialPost && closeReplyBox();

    reloadThread();
  }

  return (
    <button
      style={{ width: inEditMode ? '16rem' : '9rem' }}
      disabled={!reply}
      className={`Global-btn-1 ${
        forInitialPost ? classes.ForInitialBtn : classes.Btn
      } ${!reply && classes.Disabled}`}
      onClick={submitHandler}
    >
      {inEditMode ? 'Submit changes' : 'Submit'}
    </button>
  );
}
