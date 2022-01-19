import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AboutGroup from '../GroupPage/AboutGroup/AboutGroup';
import PostInput from '../PostInput/PostInput';
import SubitThreadBtn from './SumbitThreadBtn/SubmitThreadBtn';
import ThreadTitleForm from './ThreadTitleForm/ThreadTitleForm';
import classes from './CreateThread.module.css';

export default function CreateThread() {
  const [group, setGroup] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const [title, setTitle] = useState(null);

  const [shouldSetTitleTouched, setShouldSetTitleTouched] = useState(false);
  const [shouldSetPostContentTouched, setShouldSetPostContentTouched] =
    useState(false);
  const history = useHistory();

  useEffect(() => {
    const groupStoredInHistory = history.location.state.group;

    if (!group || group._id !== groupStoredInHistory._id)
      setGroup(groupStoredInHistory);
  }, [group, history]);

  function setTitleTouched() {
    if (!title)
      setShouldSetTitleTouched(
        (shouldSetTitleTouched) => !shouldSetTitleTouched
      );
  }

  function setPostContentTouched() {
    if (!postContent)
      setShouldSetPostContentTouched(
        (shouldSetPostContentTouched) => !shouldSetPostContentTouched
      );
  }

  return (
    group && (
      <>
        <div className={classes.CreateThread}>
          <div className={classes.HeaderWrapper}>
            <h1 className={classes.H1}>Create a thread</h1>
          </div>
          <div className={classes.InputWrapper}>
            <ThreadTitleForm
              title={title}
              setTitle={setTitle}
              shouldSetTitleTouched={shouldSetTitleTouched}
              setTitleTouched={setTitleTouched}
            />
          </div>
          <div className={classes.InputWrapper}>
            <PostInput
              postContent={postContent}
              setPostContent={setPostContent}
              shouldSetPostContentTouched={shouldSetPostContentTouched}
              setPostContentTouched={setPostContentTouched}
            />
          </div>
          <SubitThreadBtn
            postContent={postContent}
            groupId={group._id}
            title={title}
            setPostContentTouched={setPostContentTouched}
            setTitleTouched={setTitleTouched}
          />
          <AboutGroup group={group} top={`17.5rem`} />
        </div>
      </>
    )
  );
}
