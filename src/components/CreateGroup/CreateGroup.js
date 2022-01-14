import { useState } from 'react';
import { CgClose } from 'react-icons/cg';

import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import classes from './CreateGroup.module.css';
import checkValidityHandler from '../../shared/checkValidityHandler';
import { createGroupUtils } from './createGroupUtils';

const { createGroup } = createGroupUtils;

export default function CreateGroup({ show, closeModal }) {
  const [nameInput, setNameInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Group Name',
    },
    value: '',
    label: 'Group Name',
    id: 'groupName',
    valid: false,
    validation: {
      required: true,
    },
    touched: false,
  });

  const [descriptionInput, setDescriptionInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'textarea',
      placeholder: 'A short description about this group',
    },
    value: '',
    label: 'Describe your group',
    id: 'groupDescription',
    valid: false,
    validation: {
      required: true,
    },
    touched: false,
  });

  const [error, setError] = useState(null);

  function setInputAsTouched() {
    setInput({
      ...input,
      touched: true,
      elementConfig: {
        ...input.elementConfig,
        placeholder: 'Group name is required',
      },
    });
  }

  function inputChangedHandler(e) {
    const { value } = e.target;

    setInput({
      ...input,
      value,
      touched: true,
      valid: checkValidityHandler(value, input.validation),
    });
  }

  async function createGroupHandler() {
    if (!nameInput.value) setInputAsTouched();
    if (nameInput.value) {
      const data = await createGroup(input.value);

      if (data.status === 'fail') {
        setError(
          <p className={classes.Error}>That group name is already taken</p>
        );
      }
    }
  }

  const header = (
    <div className={classes.Header}>
      <p>Create a group</p>
      <CgClose className={classes.Svg} onClick={closeModal} />
    </div>
  );

  const cancelBtn = (
    <button
      onClick={closeModal}
      className={`Global-btn-2 ${classes.CancelBtn}`}
    >
      Cancel
    </button>
  );

  const createBtn = (
    <button
      className={`Global-btn-1 ${classes.ConfirmBtn}`}
      onClick={createGroupHandler}
    >
      Create Group
    </button>
  );

  const footer = (
    <div className={classes.Footer}>
      {cancelBtn}
      {createBtn}
    </div>
  );

  return (
    <>
      <Modal show={show} modalClosed={closeModal}>
        {header}
        <Input
          elementConfig={input.elementConfig}
          elementType={input.elementType}
          value={input.value}
          label={input.label}
          id={input.id}
          invalid={!input.valid}
          required
          changed={inputChangedHandler}
          wrapperClass="GroupNameWrapper"
          touched={input.touched}
        />
        {error}
        {footer}
      </Modal>
    </>
  );
}
