import { useState, useEffect } from 'react';

import Input from '../../UI/Input/Input';
import checkValidityHandler from '../../../shared/checkValidityHandler';

export default function ReplyInput(props) {
  const { setReplyContent, forInitialPost, shouldClearInput, replyContent } =
    props;

  const [contentInput, setContentInput] = useState({
    elementType: 'textarea',
    elementConfig: { placeholder: 'Say something...' },
    value: replyContent || '',
    id: 'createReply',
    valid: false,
    validation: { required: true },
    touched: false,
    wrapperClass: forInitialPost ? 'InitialReplyWrapper' : 'ReplyInputWrapper',
    className: 'ReplyInput',
    errorMsg: '',
  });

  useEffect(() => {
    if (shouldClearInput) setContentInput({ ...contentInput, value: '' });
  }, [contentInput, shouldClearInput]);

  function inputChangedHandler(e, input) {
    const { value } = e.target;

    const updatedInput = {
      ...input,
      value,
      valid: checkValidityHandler(value, input.validation),
      touched: true,
    };

    if (input.id === 'createReply') {
      setContentInput(updatedInput);
      setReplyContent(value);
    }
  }

  const form = [contentInput].map((el) => (
    <Input
      elementType={el.elementType}
      elementConfig={el.elementConfig}
      value={el.value}
      id={el.id}
      invalid={!el.valid}
      required={el.validation.required}
      touched={el.touched}
      key={el.id}
      wrapperClass={el.wrapperClass}
      changed={(e) => inputChangedHandler(e, el)}
      className={el.className}
      errorMsg={el.errorMsg}
    />
  ));

  return form;
}
