import classes from './SubmitReplyBtn.module.css';
import { submitReplyBtnUtils } from './submitReplyBtnUtils';

const { submitReply } = submitReplyBtnUtils;

export default function SubmitReplyBtn(props) {
  const {
    reply,
    parentPost,
    threadId,
    closeReplyBox,
    reloadThread,
    forInitialPost,
    clearReplyInput,
    inEditMode,
  } = props;

  async function submitPostHandler() {
    await submitReply(reply, parentPost, threadId);

    forInitialPost && clearReplyInput();

    !forInitialPost && closeReplyBox();

    reloadThread();
  }

  async function submitEditHander() {}

  return (
    <button
      style={{ width: inEditMode ? '16rem' : '9rem' }}
      disabled={!reply}
      className={`Global-btn-1 ${
        forInitialPost ? classes.ForInitialBtn : classes.Btn
      } ${!reply && classes.Disabled}`}
      onClick={inEditMode ? submitEditHander : submitPostHandler}
    >
      {inEditMode ? 'Submit changes' : 'Submit'}
    </button>
  );
}
