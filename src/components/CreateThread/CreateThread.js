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
  const history = useHistory();

  useEffect(() => {
    const groupStoredInHistory = history.location.state.group;

    if (!group || group._id !== groupStoredInHistory._id)
      setGroup(groupStoredInHistory);
  }, [group, history]);

  return (
    group && (
      <>
        <div className={classes.CreateThread}>
          <div className={classes.HeaderWrapper}>
            <h1 className={classes.H1}>Create a thread</h1>
          </div>
          <div className={classes.InputWrapper}>
            <ThreadTitleForm title={title} setTitle={setTitle} />
          </div>
          <div className={classes.InputWrapper}>
            <PostInput
              postContent={postContent}
              setPostContent={setPostContent}
            />
          </div>
          <SubitThreadBtn
            postContent={postContent}
            groupId={group._id}
            title={title}
          />
          <AboutGroup group={group} top={`17.5rem`} />
        </div>
      </>
    )
  );
}
