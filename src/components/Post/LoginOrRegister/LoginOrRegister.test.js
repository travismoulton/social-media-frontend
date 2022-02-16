import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import LoginOrRegister from './LoginOrRegister';
import { customRender, screen, fireEvent } from '../../../shared/testUtils';

describe('<Login />', () => {
  function setup() {
    const history = createMemoryHistory();
    history.location = {
      pathname: '/sampleThread',
      state: { thread: { name: 'thread' } },
      hash: 'someHash',
    };

    customRender(
      <Router history={history}>
        <LoginOrRegister />
      </Router>
    );

    return history;
  }

  test('renders', () => {
    setup();

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('Login button redirects to the login route with the correct state', () => {
    const history = setup();

    fireEvent.click(screen.getByText('Login'));

    expect(history.location.pathname).toEqual('/login');

    expect(history.location.state).toEqual({
      threadPath: '/sampleThread',
      hash: 'someHash',
      thread: { name: 'thread' },
    });
  });

  test('Register button redirects to the register route', () => {
    const history = setup();

    fireEvent.click(screen.getByText('Register'));

    expect(history.location.pathname).toEqual('/register');

    expect(history.location.state).toEqual({
      threadPath: '/sampleThread',
      hash: 'someHash',
      thread: { name: 'thread' },
    });
  });
});
