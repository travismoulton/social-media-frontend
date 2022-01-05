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
      Promise.resolve({ data: { user: mockUser, status: 'success' } })
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

    // fireEvent.change(screen.getByLabelText('Username'), {
    //   target: { value: 'travis' },
    // });
    // fireEvent.change(screen.getByLabelText('Email'), {
    //   target: { value: 'travis@test.com' },
    // });
    // fireEvent.change(screen.getByLabelText('Password'), {
    //   target: { value: 'pass1234' },
    // });
    // fireEvent.change(screen.getByLabelText('Confirm Password'), {
    //   target: { value: 'pass1234' },
    // });

    updateInput('Username', 'travis');
    updateInput('Email', 'travis@test.com');
    updateInput('Password', 'pass1234');
    updateInput('Confirm Password', 'pass1234');

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockRegister).toBeCalled());
  });
});
