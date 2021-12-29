import { useState } from 'react';

import Input from '../UI/Input/Input';
import { loginUtils } from './loginUtils';

const { login } = loginUtils;

export default function Login() {
  const [emailInput, setEmailInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your email address',
    },
    value: '',
  });

  const [passwordInput, setPasswordInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Your Password',
    },
    value: '',
  });

  function updateEmail(e) {
    setEmailInput({ ...emailInput, value: e.target.value });
  }

  function updatePassword(e) {
    setPasswordInput({ ...passwordInput, value: e.target.value });
  }

  const updateFunctions = [updateEmail, updatePassword];
  const formFields = [emailInput, passwordInput];

  const form = formFields.map((el, i) => (
    <Input
      elementType={el.elementType}
      elementConfig={el.elementConfig}
      // need to come back and change this
      key={i}
      value={el.value}
      changed={updateFunctions[i]}
    />
  ));

  return (
    <>
      {form}
      <button onClick={() => login(emailInput.value, passwordInput.value)}>
        Login
      </button>
    </>
  );
}
