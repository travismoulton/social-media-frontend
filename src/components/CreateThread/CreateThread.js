import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';

import GroupDropdown from '../GroupDropdown/GroupDropdown';
import AboutGroup from '../GroupPage/AboutGroup/AboutGroup';
import PostInput from '../PostInput/PostInput';
import SubitThreadBtn from './SumbitThreadBtn/SubmitThreadBtn';
import ThreadTitleForm from './ThreadTitleForm/ThreadTitleForm';
import classes from './CreateThread.module.css';

export default function CreateThread() {
  const [group, setGroup] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [shouldSetTitleTouched, setShouldSetTitleTouched] = useState(false);
  const [shouldSetPostContentTouched, setShouldSetPostContentTouched] =
    useState(false);
  const history = useHistory();

  useEffect(() => {
    // If the component is rendered from groupPage, there will be a group passed in the history state
    // If the componenet is rendered from the CreatePostBanner on the app home page, there will
    // be no group, so it should be set to null
    const groupStoredInHistory =
      history.location.state && history.location.state.group;

    // When the group is changed through the dropdown located inside this container, it will pass a new group
    // to the history state, and the groupState should be updated
    const shouldSetGroup =
      groupStoredInHistory &&
      (!group || group._id !== groupStoredInHistory._id);

    if (shouldSetGroup) setGroup(groupStoredInHistory);
    setLoaded(true);
  }, [group, history.location.state]);

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

  function updateGroupStateAndUrl(group) {
    history.push(`/group/${slugify(group.name)}/createThread`, { group });
  }

  return (
    loaded && (
      <div className={classes.CreateThread}>
        <div className={classes.HeaderWrapper}>
          <h1 className={classes.H1}>Create a thread</h1>
        </div>
        <GroupDropdown
          fromCreateThread
          updateGroupStateAndUrl={updateGroupStateAndUrl}
          // If rendered from GroupDetailPage, pass the groupId and groupName
          // Which will be used in setting the default value
          preLoadedGroup={group && group._id}
          groupName={group && group.name}
        />
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
          groupId={group && group._id}
          title={title}
          setPostContentTouched={setPostContentTouched}
          setTitleTouched={setTitleTouched}
          disabled={!postContent || !title || !group}
        />
        {group && <AboutGroup group={group} top={`17.5rem`} />}
      </div>
    )
  );
}
