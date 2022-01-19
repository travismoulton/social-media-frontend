import { useState, useEffect } from 'react';

import Input from '../../UI/Input/Input';
import checkValidityHandler from '../../../shared/checkValidityHandler';

export default function ThreadTitleForm(props) {
  const { title, setTitle, shouldSetTitleTouched, setTitleTouched } = props;

  const [input, setInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Thread title...',
    },
    value: title || '',
    id: 'threadTitle',
    valid: false,
    validation: { required: true },
    touched: false,
    wrapperClass: 'ThreadTitleWrapper',
    className: 'ThreadTitleInput',
    errorMsg: '',
  });

  // When the Create Thread button is clicked, if there is no title, a flag will be sent from
  // CreateThread to mark the input as touched and display the error message
  useEffect(() => {
    if (shouldSetTitleTouched) {
      setInput({ ...input, touched: true, errorMsg: 'Title is required' });
      setTitleTouched();
    }
  }, [setTitleTouched, shouldSetTitleTouched, input]);

  function inputChangedHandler(e) {
    const { value } = e.target;

    const updatedInput = {
      ...input,
      value,
      valid: checkValidityHandler(value, input.validation),
      touched: true,
    };

    setInput(updatedInput);
    setTitle(value);
  }

  return (
    <Input
      elementType={input.elementType}
      elementConfig={input.elementConfig}
      value={input.value}
      changed={inputChangedHandler}
      id={input.id}
      wrapperClass={input.wrapperClass}
      className={input.className}
      touched={input.touched}
      invalid={!input.valid}
      required={true}
      errorMsg={input.errorMsg}
    />
  );
}
