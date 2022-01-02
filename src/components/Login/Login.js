import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../UI/Input/Input';
import { loginUtils } from './loginUtils';
import { authStart, authSuccess } from '../../store/authSlice';

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

  const dispatch = useDispatch();

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
      wrapperClass="LoginInputWrapper"
    />
  ));

  async function loginAndUpdateStore() {
    dispatch(authStart());
    const { data: user } = await login(emailInput.value, passwordInput.value);
    dispatch(authSuccess(user));
  }

  return (
    <>
      {form}
      <button onClick={loginAndUpdateStore}>Login</button>
    </>
  );
}
