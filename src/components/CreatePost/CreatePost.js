import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../UI/Input/Input';
import checkValidityHandler from '../../shared/checkValidityHandler';

export default function CreatePost() {
  const history = useHistory();

  const [contentInput, setContentInput] = useState({
    elementType: 'textarea',
    elementConfig: { placeholder: 'Say something...' },
    value: '',
    id: 'createPost',
    valid: false,
    validation: { required: true },
    touched: false,
    wrapperClass: 'CreaetPostWrapper',
  });

  function setInputAsTouched(input, setStateFn) {
    setStateFn({ ...input, touched: true });
  }

  function inputChangedHandler(e, input) {
    const { value } = e.target;

    const updatedInput = {
      ...input,
      value,
      valid: checkValidityHandler(value, input.validation),
      touched: true,
    };

    if (input.id === 'createPost') setContentInput(updatedInput);
  }

  const form = [contentInput].map((el) => (
    <Input
      elementType={el.elementType}
      elementConfig={el.elementConfig}
      value={el.value}
      id={el.id}
      valid={el.valid}
      required={el.validation.required}
      touched={el.touched}
      key={el.id}
      wrapperClass={el.wrapperClass}
      changed={inputChangedHandler}
    />
  ));

  return <>{form}</>;
}
