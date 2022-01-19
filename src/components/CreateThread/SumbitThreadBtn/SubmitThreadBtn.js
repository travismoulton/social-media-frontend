import { useHistory } from 'react-router-dom';
import slugify from 'slugify';

import { submitThreadBtnUtils } from './submitThreadBtnUtils';
import classes from './SubmitThreadBtn.module.css';

const { createThread } = submitThreadBtnUtils;

export default function SubmitThreadBtn(props) {
  const {
    groupId,
    postContent,
    title,
    setTitleTouched,
    setPostContentTouched,
  } = props;

  const history = useHistory();

  async function submitHandler() {
    if (!title) setTitleTouched();
    if (!postContent) setPostContentTouched();
    if (title && postContent) {
      const { data: thread } = await createThread(groupId, title, postContent);
      history.push(`/thread/${slugify(thread.title)}`, { thread });
    }
  }

  return (
    <button className={`Global-btn-1 ${classes.Btn}`} onClick={submitHandler}>
      Create Thread
    </button>
  );
}
