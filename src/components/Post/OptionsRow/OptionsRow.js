import { BsChatRightText } from 'react-icons/bs';
import { TiEdit } from 'react-icons/ti';

import classes from '../Post.module.css';
import VoteBtns from '../VoteBtns/VoteBtns';

export default function OptionsRow(props) {
  const {
    user,
    post,
    setShowReplyInput,
    editBtnHandler,
    forInitialPost,
    numComments,
  } = props;
  const currentUserIsAuthor = user && post.author._id === user._id;
  return (
    <div className={classes.OptionsRow}>
      {user && !forInitialPost && (
        <>
          {<VoteBtns post={post} />}
          <button
            className={`${classes.OptionsRowBtn} ${classes.ReplyBtn}`}
            onClick={() =>
              setShowReplyInput((showReplyInput) => !showReplyInput)
            }
          >
            <BsChatRightText size={16} /> <span>Reply</span>
          </button>
        </>
      )}
      {forInitialPost && (
        <span className={classes.NumComments}>
          <BsChatRightText size={16} /> <span>{numComments} Comments</span>
        </span>
      )}
      {currentUserIsAuthor && (
        <>
          <button
            onClick={editBtnHandler}
            className={`${classes.OptionsRowBtn} ${classes.EditBtn}`}
          >
            <TiEdit size={16} /> <span>Edit post</span>
          </button>
        </>
      )}
    </div>
  );
}
