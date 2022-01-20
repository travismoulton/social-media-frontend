import classes from './SubmitReplyBtn.module.css';
import { submitReplyBtnUtils } from './submitReplyBtnUtils';
import { useHistory } from 'react-router-dom';

const { submitReply } = submitReplyBtnUtils;

export default function SubmitReplyBtn({ reply, parentPost, threadId }) {
  const history = useHistory();

  async function submitHandler() {
    const data = await submitReply(reply, parentPost, threadId);

    const currentUrl = history.location.pathname;

    // history.push(currentUrl);
  }

  return (
    <button className={`Global-btn-1 ${classes.Btn}`} onClick={submitHandler}>
      Submit
    </button>
  );
}
