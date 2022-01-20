import classes from './SubmitReplyBtn.module.css';
import { submitReplyBtnUtils } from './submitReplyBtnUtils';

const { submitReply } = submitReplyBtnUtils;

export default function SubmitReplyBtn(props) {
  const { reply, parentPost, threadId, closeReplyBox, reloadThread } = props;

  async function submitHandler() {
    const data = await submitReply(reply, parentPost, threadId);

    closeReplyBox();
    reloadThread();
  }

  return (
    <button className={`Global-btn-1 ${classes.Btn}`} onClick={submitHandler}>
      Submit
    </button>
  );
}
