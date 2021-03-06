import { useHistory } from 'react-router-dom';
import slugify from 'slugify';

import { submitThreadBtnUtils } from './submitThreadBtnUtils';
import classes from './SubmitThreadBtn.module.css';

const { createThread } = submitThreadBtnUtils;

export default function SubmitThreadBtn(props) {
  const { groupId, postContent, title, disabled } = props;

  const history = useHistory();

  async function submitHandler() {
    const { data: thread } = await createThread(groupId, title, postContent);

    history.push(`/thread/${slugify(thread.title)}`, { thread });
  }

  return (
    <button
      className={`Global-btn-1 ${classes.Btn} ${disabled && classes.Disabled}`}
      onClick={submitHandler}
      disabled={disabled}
    >
      Create Thread
    </button>
  );
}
