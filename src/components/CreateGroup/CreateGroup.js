import { useState } from 'react';
import { CgClose } from 'react-icons/cg';

import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import classes from './CreateGroup.module.css';
import checkValidityHandler from '../../shared/checkValidityHandler';
import { createGroupUtils } from './createGroupUtils';

const { createGroup } = createGroupUtils;

export default function CreateGroup({ show, closeModal }) {
  const [input, setInput] = useState({
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

  function createGroupHandler() {
    if (!input.value) setInputAsTouched();
    else createGroup(input.value);
  }

  const header = (
    <div className={classes.Header}>
      <p>Create a group</p>
      <CgClose className={classes.Svg} />
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
        {footer}
      </Modal>
    </>
  );
}
