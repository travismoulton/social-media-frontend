import { useState } from 'react';

import Input from '../../UI/Input/Input';
import checkValidityHandler from '../../../shared/checkValidityHandler';

export default function ThreadTitleForm(props) {
  const { title, setTitle } = props;

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
