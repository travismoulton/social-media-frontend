import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

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

function setup() {
  const mockState = {
    auth: { user: {} },
  };

  const history = createMemoryHistory();
  customRender(
    <Router history={history}>
      <Login />
    </Router>,
    { preloadedState: mockState }
  );

  return history;
}

describe('<Login />', () => {
  let mockLogin;
  beforeEach(() => {
    mockLogin = createSpy(utils, 'login', Promise.resolve({ data: mockUser }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockLogin = null;
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

    expect(
      screen.queryByPlaceholderText('Username is required')
    ).not.toBeInTheDocument();

    const btn = screen.getByRole('button');

    fireEvent.click(btn);

    expect(
      screen.getByPlaceholderText('Username is required')
    ).toBeInTheDocument();

    await waitFor(() => expect(mockLogin).not.toBeCalled());
  });
});
