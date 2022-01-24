import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import {
  customRender,
  screen,
  waitFor,
  createSpy,
} from '../../shared/testUtils';
import { threadUtils as utils } from './threadUtils';
import { mockInitialPost, mockThread } from '../../shared/mockThread';
import Thread from './Thread';

jest.mock('./threadUtils');

describe('<Thread />', () => {
  function setup() {
    const history = createMemoryHistory();
    history.location.state = { thread: mockThread };

    const preloadedState = { auth: { user: { _id: 'mockUser1' } } };

    customRender(
      <Router history={history}>
        <Thread />
      </Router>,
      { preloadedState }
    );
  }

  let mockFetchPost;

  // Mock post needs to be wrapped in a data object because that is how Thread
  // expects it.
  const mockData = { post: mockInitialPost };

  beforeEach(() => {
    mockFetchPost = createSpy(
      utils,
      'fetchInitialPost',
      Promise.resolve({ data: mockData })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockFetchPost = null;
  });

  test('nested replies are displayed', async () => {
    await waitFor(() => setup());

    expect(mockFetchPost).toBeCalled();

    expect(screen.getByText('mock reply 2 content')).toBeInTheDocument();
  });
});
