import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import * as reactRedux from 'react-redux';

import * as mockActions from '../../store/authSlice';
import {
  customRender,
  fireEvent,
  createSpy,
  waitFor,
  screen,
} from '../../shared/testUtils';
import { mockUser } from '../../shared/mockUser';
import Login from './Login';
import { loginUtils as utils } from './loginUtils';

jest.mock('./loginUtils');

function setup(withRedirect) {
  const mockState = {
    auth: { user: {} },
  };

  const history = createMemoryHistory();

  if (withRedirect)
    history.location.state = {
      threadPath: '/sampleThreadPath',
      thread: {},
    };

  // When testing the redirect functionality, add in the user to to trigger the redirect in the component.
  !withRedirect
    ? customRender(
        <Router history={history}>
          <Login />
        </Router>
      )
    : customRender(
        <Router history={history}>
          <Login />
        </Router>,
        { preloadedState: mockState }
      );

  return history;
}

describe('<Login />', () => {
  let mockLogin, dummyDispatch, mockUseDispatch, mockAuthSuccess;
  beforeEach(() => {
    mockLogin = createSpy(
      utils,
      'login',
      Promise.resolve({ data: { mockUser, status: 'success' } })
    );

    dummyDispatch = jest.fn();
    mockUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    mockUseDispatch.mockReturnValue(dummyDispatch);

    mockAuthSuccess = jest
      .spyOn(mockActions, 'authSuccess')
      .mockImplementation(jest.fn(() => {}));
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockLogin = null;
    dummyDispatch = null;
    mockUseDispatch = null;
    mockAuthSuccess = null;
  });

  test('renders', () => {
    setup();

    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  test('redirects if logged in', () => {
    const history = setup();

    expect(history.location.pathname).toBe('/');
  });

  test('makes API call with email and password', async () => {
    setup();

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'email@email.com' },
    });

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockLogin).toBeCalledWith('email@email.com', 'password');
    });
  });

  test('If email or password is missing, API is not called', async () => {
    setup();

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();

    const btn = screen.getByRole('button');

    fireEvent.click(btn);

    expect(screen.getByText('Email is required')).toBeInTheDocument();

    await waitFor(() => expect(mockLogin).not.toBeCalled());
  });

  test('After the user submits login credentials, they are dispatched to the store', async () => {
    setup(true);

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'email@email.com' },
    });

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockLogin).toBeCalledWith('email@email.com', 'password');
    });

    await waitFor(() => expect(mockAuthSuccess).toBeCalled());
  });

  test('If the route / component is hit with a user in global state, and a thread path in the history, redirects to the thread', async () => {
    const history = setup(true);

    expect(history.location.pathname).toBe('/sampleThreadPath');
  });
});
