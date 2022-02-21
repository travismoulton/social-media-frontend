import { CgClose } from 'react-icons/cg';

import Modal from '../../UI/Modal/Modal';
import classes from './ConfirmDeletePostModal.module.css';

export default function ConfirmDeletePostModal(props) {
  const { show, closeModal, deletePostHandler } = props;

  function confirmDeletePost() {
    deletePostHandler();
    closeModal();
  }

  return (
    <Modal show={show} modalClosed={closeModal}>
      <div className={classes.Container}>
        <span className={classes.Header}>
          <p>Are you sure you want to delete this post?</p>
          <CgClose className={classes.Svg} onClick={closeModal} />
        </span>
        <span className={classes.BtnRow}>
          <button
            className={`Global-btn-1 ${classes.Btn}`}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={`Global-btn-1 ${classes.Btn}`}
            onClick={confirmDeletePost}
          >
            Yes
          </button>
        </span>
      </div>
    </Modal>
  );
}
