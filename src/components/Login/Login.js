import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import ContinueAsGuest from '../Navigation/NavItems/ContinueAsGuest/ContinueAsGuest';
import Input from '../UI/Input/Input';
import { loginUtils } from './loginUtils';
import { authStart, authSuccess, authFail } from '../../store/authSlice';
import classes from './Login.module.css';
import checkValidityHandler from '../../shared/checkValidityHandler';
import { useEffect } from 'react';

const { login } = loginUtils;

export default function Login() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const btnRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Login';
  });

  // When directed here from LoginOrRegister, there will be state in the history,
  // which indicates that after login, the user should be redirected to the Thread
  // they were viewing
  const shouldRedirectToThread = !!history.location.state;

  // If passed state through history, extract the threadPath, threadObject, and hash (if present)
  // Use that to build the redirect path and redirect state
  const { threadPath, thread, hash } =
    shouldRedirectToThread && history.location.state;
  const redirectPath = `${threadPath}${hash ? hash : ''}`;
  const redirectState = { thread, scrollToComments: !!hash };

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
    errorMsg: '',
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
    errorMsg: '',
  });

  const [error, setError] = useState({
    isError: false,
    msg: <p style={{ color: 'red' }}>Incorrect email or password</p>,
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
      errorMsg={el.errorMsg}
    />
  ));

  function setInputAsTouched(input) {
    if (input.id === 'email')
      setEmailInput({
        ...emailInput,
        touched: true,
        errorMsg: 'Email is required',
      });
    if (input.id === 'password')
      setPasswordInput({
        ...passwordInput,
        touched: true,
        errorMsg: 'Password is required',
      });
  }

  function loginHandler() {
    if (!emailInput.value) setInputAsTouched(emailInput);
    if (!passwordInput.value) setInputAsTouched(passwordInput);

    if (emailInput.valid && passwordInput.valid) loginAndUpdateStore();
  }

  async function loginAndUpdateStore() {
    dispatch(authStart());
    const { data } = await login(emailInput.value, passwordInput.value);

    // data.data contains the user info
    if (data.status === 'success') dispatch(authSuccess(data.data));
    else if (data.status === 'fail') {
      dispatch(authFail());
      setError({ ...error, isError: true });
    }
  }

  // If the user presses enter, and there is an email and password in the inputs, toggle
  // the login btn
  useEffect(() => {
    function clickBtn(e) {
      const credentialsEntered = emailInput.valid && passwordInput.valid;
      if (e.key === 'Enter' && credentialsEntered) btnRef.current.click();
    }
    document.addEventListener('keydown', clickBtn);

    return () => document.removeEventListener('keydown', clickBtn);
  }, [btnRef, emailInput.valid, passwordInput.valid]);

  return (
    <>
      {/* If the user is already logged in redirect to the homepage 
      if they did not login from viewing a thread */}
      {user && !shouldRedirectToThread && <Redirect to="/" />}

      {/* If the user logs in, and was brought to this route through the link in threadView,
      redirect them to the thread they were on  */}
      {user && shouldRedirectToThread && (
        <Redirect
          to={{ pathname: redirectPath, state: { ...redirectState } }}
        />
      )}
      <div className={classes.Login}>
        {form}
        {error.isError && error.msg}
        <button
          ref={btnRef}
          className={`${'Global-btn-1 ' + classes.Btn}`}
          onClick={loginHandler}
        >
          Login
        </button>
        <p>- or -</p>
        <ContinueAsGuest
          redirectPath={shouldRedirectToThread && redirectPath}
          redirectState={shouldRedirectToThread && redirectState}
        />
        <p>
          Need an account? <Link to="register">Register</Link>
        </p>
      </div>
    </>
  );
}
