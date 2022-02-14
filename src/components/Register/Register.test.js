import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import * as reactRedux from 'react-redux';

import * as mockActions from '../../store/authSlice';
import {
  customRender,
  waitFor,
  screen,
  createSpy,
  fireEvent,
} from '../../shared/testUtils';
import { registerUtils as utils } from './registerUtils';
import { mockUser } from '../../shared/mockUser';
import Register from './Register';

jest.mock('./registerUtils');

function updateInput(label, value) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

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

  !withRedirect
    ? customRender(
        <Router history={history}>
          <Register />
        </Router>
      )
    : customRender(
        <Router history={history}>
          <Register />
        </Router>,
        { preloadedState: mockState }
      );

  return history;
}

describe('<Register />', () => {
  let mockRegister, dummyDispatch, mockUseDispatch, mockAuthSuccess;

  beforeEach(() => {
    mockRegister = createSpy(
      utils,
      'register',
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
    mockRegister = null;
    dummyDispatch = null;
    mockUseDispatch = null;
    mockAuthSuccess = null;
  });

  test('renders', () => {
    setup();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
  });

  test('calls the register method when all fields are filled out properly', async () => {
    setup();

    updateInput('Username', 'travis');
    updateInput('Email', 'travis@test.com');
    updateInput('Password', 'pass1234');
    updateInput('Confirm Password', 'pass1234');

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockRegister).toBeCalledWith(
        expect.objectContaining({
          email: 'travis@test.com',
          name: 'travis',
          password: 'pass1234',
        })
      )
    );
  });

  test('dispatches the new user to the redux store after successful register', async () => {
    setup();

    updateInput('Username', 'travis');
    updateInput('Email', 'travis@test.com');
    updateInput('Password', 'pass1234');
    updateInput('Confirm Password', 'pass1234');

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockAuthSuccess).toBeCalled());
  });

  test("if passwords don't match, the api is not called and the error is displayed", async () => {
    setup();

    updateInput('Username', 'travis');
    updateInput('Email', 'travis@test.com');
    updateInput('Password', 'pass1234');
    updateInput('Confirm Password', 'p');

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockRegister).not.toBeCalled());

    const errorMsg = screen.getByText('Passwords do not match');
    expect(errorMsg).toBeInTheDocument();
  });

  test('if an input field is not filled out, the error message is displayed', async () => {
    setup();

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockRegister).not.toBeCalled());

    const errorMessages = screen.getAllByText('Required Field');

    expect(errorMessages).toHaveLength(4);
  });

  test('If the password is less than 8 characters, error message is displayed', async () => {
    setup();

    updateInput('Username', 'travis');
    updateInput('Email', 'travis@test.com');
    updateInput('Password', 'pass123');
    updateInput('Confirm Password', 'pass123');

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockRegister).not.toBeCalled());

    const errorMsg = screen.getByText('Password must be at least 8 characters');
    expect(errorMsg).toBeInTheDocument();
  });

  test('If the route / component is hit with a user in global state, and a thread path in the history, redirects to the thread', async () => {
    const history = setup(true);

    expect(history.location.pathname).toBe('/sampleThreadPath');
  });
});
