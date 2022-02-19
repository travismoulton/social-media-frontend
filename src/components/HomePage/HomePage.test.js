/* eslint-disable testing-library/no-wait-for-side-effects */
import HomePage from './HomePage';
import {
  customRender,
  screen,
  createSpy,
  waitFor,
} from '../../shared/testUtils';
import { threadFeedUtils as utils } from '../ThreadFeed/threadFeedUtils';

jest.mock('../ThreadFeed/threadFeedUtils');

describe('<HomePage />', () => {
  const data = { threads: [], next: null };
  beforeEach(() => {
    createSpy(utils, 'fetchAllThreadsPaginated', Promise.resolve({ data }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with CreatePostBanner if there is a user', async () => {
    const preloadedState = { auth: { user: {} } };
    await waitFor(() => customRender(<HomePage />, { preloadedState }));

    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('renders without createPostBanner if there is no user', async () => {
    await waitFor(() => customRender(<HomePage />));
    expect(screen.queryByText('Create Post')).not.toBeInTheDocument();
  });
});
