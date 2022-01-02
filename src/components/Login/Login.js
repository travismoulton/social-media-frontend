import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../UI/Input/Input';
import { loginUtils } from './loginUtils';
import { authStart, authSuccess } from '../../store/authSlice';
import classes from './Login.module.css';
import checkValidityHandler from '../../shared/checkValidityHandler';

const { login } = loginUtils;

export default function Login() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [emailInput, setEmailInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your email address',
    },
    value: '',
    label: 'Email',
    id: 'email',
    valid: false,
    validation: {
      required: true,
    },
    touched: false,
  });

  const [passwordInput, setPasswordInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Your Password',
    },
    value: '',
    label: 'Password',
    id: 'password',
    valid: false,
    validation: {
      required: true,
    },
    touched: false,
  });

  const [error, setError] = useState({ isError: false });

  function inputChangedHandler(e, input) {
    const { value } = e.target;

    const updatedInput = {
      ...input,
      value,
      valid: checkValidityHandler(value, input.validation),
      touched: true,
    };

    if (input.id === 'email') setEmailInput(updatedInput);
    if (input.id === 'password') setPasswordInput(updatedInput);
  }

  const form = [emailInput, passwordInput].map((el) => (
    <Input
      elementType={el.elementType}
      elementConfig={el.elementConfig}
      key={el.id}
      value={el.value}
      changed={(e) => inputChangedHandler(e, el)}
      wrapperClass="LoginInputWrapper"
      label={el.label}
      id={el.id}
      required={el.validation.required}
      invalid={!el.valid}
      touched={el.touched}
    />
  ));

  function setInputAsTouched(input) {
    if (input.id === 'email')
      setEmailInput({
        ...emailInput,
        touched: true,
        elementConfig: {
          ...emailInput.elementConfig,
          placeholder: 'Username is required',
        },
      });
    if (input.id === 'password')
      setPasswordInput({
        ...passwordInput,
        touched: true,
        elementConfig: {
          ...passwordInput.elementConfig,
          placeholder: 'Password is required ',
        },
      });
  }

  function loginHandler() {
    if (!emailInput.value) setInputAsTouched(emailInput);
    if (!passwordInput.value) setInputAsTouched(passwordInput);

    if (emailInput.valid && passwordInput.valid) loginAndUpdateStore();
  }

  async function loginAndUpdateStore() {
    dispatch(authStart());
    const { data: user } = await login(emailInput.value, passwordInput.value);
    dispatch(authSuccess(user));
  }

  return (
    <>
      {/* If the user is already logged in redirect to the homepage */}
      {user && <Redirect to="/" />}
      <div className={classes.Login}>
        {form}
        <button
          className={`${'Global-btn-1 ' + classes.Btn}`}
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </>
  );
}
