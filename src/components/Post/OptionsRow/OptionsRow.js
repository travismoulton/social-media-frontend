import { BsChatRightText } from 'react-icons/bs';
import { TiEdit, TiTrash } from 'react-icons/ti';
import { useState } from 'react';

import ConfirmDeletePostModal from '../ConfirmDeletePostModal/ConfirmDeletePostModal';
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
    deletePostHandler,
  } = props;

  const currentUserIsAuthor = user && post.author._id === user._id;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
            <BsChatRightText size={16} />{' '}
            <span>
              {numComments} {numComments === 1 ? 'Comment' : 'Comments'}
            </span>
          </span>
        )}
        {currentUserIsAuthor && !post.isDeleted && (
          <>
            <button
              onClick={editBtnHandler}
              className={`${classes.OptionsRowBtn} ${classes.EditBtn}`}
            >
              <TiEdit size={16} /> <span>Edit post</span>
            </button>

            <button
              onClick={() => setShowModal(true)}
              className={`${classes.OptionsRowBtn} ${classes.EditBtn}`}
            >
              <TiTrash size={16} /> <span>Delete post</span>
            </button>
          </>
        )}
      </div>
      <ConfirmDeletePostModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        deletePostHandler={deletePostHandler}
      />
    </>
  );
}
