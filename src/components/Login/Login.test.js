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

describe('<Login />', () => {
  let mockLogin;
  beforeEach(() => {
    mockLogin = createSpy(utils, 'login', Promise.resolve({ data: mockUser }));

    mockLogin = jest
      .spyOn(utils, 'login')
      .mockImplementationOnce(
        jest.fn(() => Promise.resolve({ data: mockUser }))
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockLogin = null;
  });

  test('renders', () => {
    customRender(<Login />);

    const element = screen.getByText('Email');

    expect(element).toBeInTheDocument();
  });

  test('redirects if logged in', () => {
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

    expect(history.location.pathname).toBe('/');
  });

  test('makes API call with email and password', async () => {
    customRender(
      <Router history={createMemoryHistory()}>
        <Login />
      </Router>
    );

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
});
