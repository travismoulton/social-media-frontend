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
  } = props;

  async function submitHandler() {
    const data = await submitReply(reply, parentPost, threadId);

    closeReplyBox();
    reloadThread();
  }

  return (
    <button
      disabled={!reply}
      className={`Global-btn-1 ${
        forInitialPost ? classes.ForInitialBtn : classes.Btn
      } ${!reply && classes.Disabled}`}
      onClick={submitHandler}
    >
      Submit
    </button>
  );
}
