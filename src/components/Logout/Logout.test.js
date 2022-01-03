import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { customRender, createSpy, waitFor } from '../../shared/testUtils';
import { logoutUtils as utils } from './logoutUtils';
import Logout from './Logout';

jest.mock('./logoutUtils');

describe('<Logout />', () => {
  let mockLogout;

  beforeEach(() => {
    mockLogout = createSpy(utils, 'logout', Promise.resolve({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockLogout = null;
  });

  test('makes the api call to logout and redirects to home if there is a user', async () => {
    const history = createMemoryHistory();
    const mockState = {
      auth: { user: {} },
    };

    customRender(
      <Router history={history}>
        <Logout />
      </Router>,
      { preloadedState: mockState }
    );

    await waitFor(() => expect(mockLogout).toBeCalled());
    expect(history.location.pathname).toBe('/');
  });

  test('does not make the api call if no user', async () => {
    const history = createMemoryHistory();

    customRender(
      <Router history={history}>
        <Logout />
      </Router>
    );

    await waitFor(() => expect(mockLogout).not.toBeCalled());
    expect(history.location.pathname).toBe('/');
  });
});
