import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Input from '../UI/Input/Input';
import { registerUtils } from './registerUtils';
import { authStart, authSuccess, authFail } from '../../store/authSlice';
import classes from './Register.module.css';
import checkValidityHandler from '../../shared/checkValidityHandler';

const { register } = registerUtils;

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

  const [nameInput, setNameInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your username',
    },
    value: '',
    label: 'Username',
    id: 'username',
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

  const [confirmPasswordInput, setConfirmPasswordInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Confirm Password',
    },
    value: '',
    label: 'Confirm Password',
    id: 'confirm',
    valid: false,
    validation: {
      required: true,
    },
    touched: false,
  });

  const [error, setError] = useState({
    isError: false,
    msg: null,
  });

  function inputChangedHandler(e, input) {
    const { value } = e.target;

    const updatedInput = {
      ...input,
      value,
      valid: checkValidityHandler(value, input.validation),
      touched: true,
    };

    if (input.id === 'email') setEmailInput(updatedInput);
    if (input.id === 'username') setNameInput(updatedInput);
    if (input.id === 'password') setPasswordInput(updatedInput);
    if (input.id === 'confirm') setConfirmPasswordInput(updatedInput);
  }

  const form = [nameInput, emailInput, passwordInput, confirmPasswordInput].map(
    (el) => (
      <Input
        elementType={el.elementType}
        elementConfig={el.elementConfig}
        key={el.id}
        value={el.value}
        changed={(e) => inputChangedHandler(e, el)}
        wrapperClass="RegisterInputWrapper"
        label={el.label}
        id={el.id}
        required={el.validation.required}
        invalid={!el.valid}
        touched={el.touched}
      />
    )
  );

  // If on clicking the register button, any of the input fields is empty, set touched
  // to true so the Input component will render it with the proper styles
  function setInputAsTouched(input, setStateFn, placeholderText) {
    setStateFn({
      ...input,
      touched: true,
      elementConfig: {
        ...input.elementConfig,
        placeholder: placeholderText,
      },
    });
  }

  function checkPasswordsMatch() {
    return (
      passwordInput.value && passwordInput.value === confirmPasswordInput.value
    );
  }

  const passwordsDontMatchError = {
    isError: true,
    msg: <p style={{ color: 'red' }}>Passwords do not match</p>,
  };

  function setErrorMessageFromServer(msg) {
    setError({ isError: true, msg: <p style={{ color: 'red' }}>{msg}</p> });
  }

  function checkAllInputsForValues() {
    // If any field is empty, set it as touched to display it in red
    if (!nameInput.value)
      setInputAsTouched(nameInput, setNameInput, 'A username is required');
    if (!emailInput.value)
      setInputAsTouched(emailInput, setEmailInput, 'An email is required');
    if (!passwordInput.value)
      setInputAsTouched(
        passwordInput,
        setPasswordInput,
        'A Password is required'
      );
    if (!confirmPasswordInput.value)
      setInputAsTouched(
        confirmPasswordInput,
        setConfirmPasswordInput,
        'Password must be confirmed'
      );
  }

  function checkPasswordHasEightCharacters() {
    // Only display password length error if the passwords match and have a value
    return checkPasswordsMatch() && passwordInput.value.length > 7;
  }

  const passwordTooShortError = {
    isError: true,
    msg: <p style={{ color: 'red' }}>Password must be at least 8 characters</p>,
  };

  async function registerHandler() {
    checkAllInputsForValues();

    const allFieldsHaveAValue =
      emailInput.valid &&
      passwordInput.valid &&
      nameInput.valid &&
      confirmPasswordInput.valid;

    if (!checkPasswordsMatch()) setError({ ...passwordsDontMatchError });

    if (!checkPasswordHasEightCharacters())
      setError({ ...passwordTooShortError });

    if (
      allFieldsHaveAValue &&
      checkPasswordsMatch() &&
      checkPasswordHasEightCharacters()
    )
      await registerAndUpdateStore();
  }

  async function registerAndUpdateStore() {
    dispatch(authStart());

    const userData = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    const { data } = await register(userData);

    // data.data contains the user info
    if (data.status === 'success') dispatch(authSuccess(data.data));
    else if (data.status === 'fail') {
      dispatch(authFail());
      setErrorMessageFromServer(data.data.message);
    }
  }

  return (
    <>
      {/* If the user is already logged in redirect to the homepage */}
      {user && <Redirect to="/" />}
      <div className={classes.Register}>
        {form}
        {error.isError && error.msg}
        <button
          className={`${'Global-btn-1 ' + classes.Btn}`}
          onClick={registerHandler}
        >
          Register
        </button>
        <p>
          Already have an account? <Link to="login">Login</Link>
        </p>
      </div>
    </>
  );
}
