import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CgClose } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';

import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import classes from './CreateGroup.module.css';
import checkValidityHandler from '../../shared/checkValidityHandler';
import { createGroupUtils } from './createGroupUtils';
import { addGroupMembership } from '../../store/authSlice';

const { createGroup } = createGroupUtils;

export default function CreateGroup({ show, closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

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
    wrapperClass: 'GroupNameWrapper',
    errorMsg: '',
  });

  const [descriptionInput, setDescriptionInput] = useState({
    elementType: 'textarea',
    elementConfig: {
      placeholder: 'A short description about this group',
    },
    value: '',

    id: 'groupDescription',
    valid: false,
    validation: {
      required: false,
    },
    touched: false,
    wrapperClass: 'GroupDescriptionWrapper',
    className: 'GroupDescription',
  });

  const [error, setError] = useState(null);

  function inputChangedHandler(e, input) {
    const { value } = e.target;

    const updatedInput = {
      ...input,
      value,
      valid: checkValidityHandler(value, input.validation),
      touched: true,
    };

    if (input.id === 'groupName') setNameInput(updatedInput);
    if (input.id === 'groupDescription') setDescriptionInput(updatedInput);
  }

  async function createGroupHandler() {
    if (!nameInput.value) {
      setNameInput({
        ...nameInput,
        touched: true,
        errorMsg: 'Group name is required',
      });
      return;
    }

    const groupData = {
      name: nameInput.value,
      description: descriptionInput.value,
    };

    const data = await createGroup(groupData);
    const { data: group } = data;

    if (data.status === 'fail') {
      setError(
        <p className={classes.Error}>That group name is already taken</p>
      );
    } else if (data.status === 'success') {
      dispatch(addGroupMembership(group._id));
      closeModal();
      history.push(`/group/${slugify(group.name)}`, { groupId: group._id });
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

  const form = [nameInput, descriptionInput].map((el) => (
    <Input
      elementConfig={el.elementConfig}
      elementType={el.elementType}
      value={el.value}
      label={el.label}
      id={el.id}
      invalid={!el.valid}
      required
      changed={(e) => inputChangedHandler(e, el)}
      wrapperClass={el.wrapperClass}
      touched={el.touched}
      key={el.id}
      className={el.className}
      errorMsg={el.errorMsg}
    />
  ));

  const textAreaCharCounter = (
    <p className={classes.CharCounter}>
      {128 - descriptionInput.value.length} charachters remaining
    </p>
  );

  return (
    <>
      <Modal show={show} modalClosed={closeModal}>
        {header}
        {form}
        {textAreaCharCounter}
        {error}
        {footer}
      </Modal>
    </>
  );
}
