import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../UI/Input/Input';
import { loginUtils } from './loginUtils';
import { authStart, authSuccess } from '../../store/authSlice';
import classes from './Login.module.css';

const { login } = loginUtils;

export default function Login() {
  const { user } = useSelector((state) => state.auth);

  const [emailInput, setEmailInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your email address',
    },
    value: '',
    label: 'Email',
    id: 'email',
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
      key={el.id}
      value={el.value}
      changed={updateFunctions[i]}
      wrapperClass="LoginInputWrapper"
      label={el.label}
      id={el.id}
    />
  ));

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
          onClick={loginAndUpdateStore}
        >
          Login
        </button>
      </div>
    </>
  );
}
