import { submitThreadBtnUtils } from './submitThreadBtnUtils';
import classes from './SubmitThreadBtn.module.css';

const { createThread } = submitThreadBtnUtils;

export default function SubmitThreadBtn({ groupId, postContent, title }) {
  async function submitHandler() {
    const { thread } = await createThread(groupId, title, postContent);
  }

  return (
    <button className={`Global-btn-1 ${classes.Btn}`} onClick={submitHandler}>
      Create Thread
    </button>
  );
}
