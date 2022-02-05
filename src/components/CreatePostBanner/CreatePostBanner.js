import { useHistory } from 'react-router-dom';
import slugify from 'slugify';

import classes from './CreatePostBanner.module.css';

export default function CreatePostBanner({ group }) {
  const history = useHistory();

  function handleClick() {
    if (group) {
      history.push(`/group/${slugify(group.name)}/createThread`, { group });
    } else {
      history.push(`/createThread`);
    }
  }

  return (
    <button onClick={handleClick} className={classes.Btn}>
      Create Post
    </button>
  );
}
