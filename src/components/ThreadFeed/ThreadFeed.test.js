import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ThreadFeed from './ThreadFeed';
import { threadFeedUtils as utils } from './threadFeedUtils';
import {
  customRender,
  screen,
  createSpy,
  waitFor,
  fireEvent,
} from '../../shared/testUtils';
import { mockThreads } from '../../shared/mockThreadFeed';

jest.mock('./threadFeedUtils');

describe('<ThreadFeed />', () => {
  let mockFecthAllThreads, mockFetchByGroup;

  const allThreads = { threads: mockThreads };
  const groupThreads = { threads: mockThreads.slice(0, 1) };

  beforeEach(() => {
    mockFecthAllThreads = createSpy(
      utils,
      'fetchAllThreadsPaginated',
      Promise.resolve({ data: allThreads })
    );

    mockFetchByGroup = createSpy(
      utils,
      'fetchThreadsByGroupPaginated',
      Promise.resolve({ data: groupThreads })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockFecthAllThreads = null;
    mockFetchByGroup = null;
  });

  function setup(withGroup) {
    const history = createMemoryHistory();
    customRender(
      <Router history={history}>
        <ThreadFeed groupId={withGroup ? 'groupOne' : null} />
      </Router>
    );
  }

  test('renders feed sort banner, and if not called with a groupId prop, fetches all threads', async () => {
    setup();

    await waitFor(() => expect(mockFecthAllThreads).toBeCalled());

    expect(screen.getByText('Sort by most popular')).toBeInTheDocument();

    // There are three threads inside the mockThreads array
    expect(screen.getByText('mockThread1')).toBeInTheDocument();
    expect(screen.getByText('mockThread2')).toBeInTheDocument();
    expect(screen.getByText('mockThread3')).toBeInTheDocument();
  });

  test('calls fetchThreadByGroup if called with a groupId prop', async () => {
    setup(true);

    await waitFor(() => expect(mockFetchByGroup).toBeCalled());

    expect(screen.getByText('mockThread1')).toBeInTheDocument();
  });

  test('If one of the sort buttons is clicked, threads is set to null, and fetchThreads is called again', async () => {
    setup();

    await waitFor(() => expect(mockFecthAllThreads).toBeCalled());

    const sortBtn = screen.getByText('Sort by newest');
    fireEvent.click(sortBtn);

    await waitFor(() => expect(mockFecthAllThreads).toBeCalledTimes(2));
  });
});
