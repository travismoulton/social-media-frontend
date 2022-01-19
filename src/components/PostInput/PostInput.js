import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../UI/Input/Input';
import checkValidityHandler from '../../shared/checkValidityHandler';

export default function PostInput(props) {
  const {
    postContent,
    setPostContent,
    shouldSetPostContentTouched,
    setPostContentTouched,
  } = props;

  const history = useHistory();

  const [contentInput, setContentInput] = useState({
    elementType: 'textarea',
    elementConfig: { placeholder: 'Say something...' },
    value: postContent || '',
    id: 'createPost',
    valid: false,
    validation: { required: true },
    touched: false,
    wrapperClass: 'PostInputWrapper',
    className: 'PostInput',
    errorMsg: '',
  });

  // When the Create Thread button is clicked, if there is no post content, a flag will be sent from
  // CreateThread to mark the input as touched and display the error message
  useEffect(() => {
    if (shouldSetPostContentTouched) {
      setContentInput({
        ...contentInput,
        touched: true,
        errorMsg: 'Post can not be empty',
      });

      setPostContentTouched();
    }
  }, [contentInput, shouldSetPostContentTouched, setPostContentTouched]);

  function inputChangedHandler(e, input) {
    const { value } = e.target;

    const updatedInput = {
      ...input,
      value,
      valid: checkValidityHandler(value, input.validation),
      touched: true,
    };

    if (input.id === 'createPost') {
      setContentInput(updatedInput);
      setPostContent(value);
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

  return <>{form}</>;
}
