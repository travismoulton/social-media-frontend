import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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

describe('<Register />', () => {
  let mockRegister;

  beforeEach(() => {
    mockRegister = createSpy(
      utils,
      'register',
      Promise.resolve({ data: mockUser })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRegister = null;
  });

  test('renders', () => {
    customRender(<Register />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
  });

  test('calls the register method when all fields are filled out properly', async () => {
    const history = createMemoryHistory();
    customRender(
      <Router history={history}>
        <Register />
      </Router>
    );

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

  test("if passwords don't match, the api is not called and the error is displayed", async () => {
    customRender(<Register />);

    updateInput('Username', 'travis');
    updateInput('Email', 'travis@test.com');
    updateInput('Password', 'pass1234');
    updateInput('Confirm Password', 'p');

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockRegister).not.toBeCalled());

    const errorMsg = screen.getByText('Password must be at least 8 characters');
    expect(errorMsg).toBeInTheDocument();
  });

  test('if an input field is not filled out, the error placeholder is updated', async () => {
    customRender(<Register />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockRegister).not.toBeCalled());

    expect(
      screen.getByPlaceholderText('A username is required')
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('An email is required')
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('A Password is required')
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Password must be confirmed')
    ).toBeInTheDocument();
  });
});
