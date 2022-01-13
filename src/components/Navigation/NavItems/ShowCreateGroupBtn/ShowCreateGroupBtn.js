import { useState } from 'react';

import classes from './ShowCreateGroupBtn.module.css';
import CreateGroup from '../../../CreateGroup/CreateGroup';

export default function ShowCreateGroupBtn() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p onClick={() => setShowModal(true)} className={classes.Link}>
        Create Group
      </p>

      <CreateGroup show={showModal} closeModal={() => setShowModal(false)} />
    </>
  );
}
