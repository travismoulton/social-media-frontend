import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { groupPageUtils as utils } from './groupPageUtils';

import {
  customRender,
  screen,
  createSpy,
  waitFor,
} from '../../shared/testUtils';
import GroupPage from './GroupPage';

jest.mock('./groupPageUtils');
jest.mock('./GroupHeader/MembershipBtn/membershipBtnUtils');

describe('<GroupPage />', () => {
  async function setup() {
    const history = createMemoryHistory();
    history.location.state = { groupId: 'groupId' };

    const preloadedState = {
      auth: { user: { groupMemberships: ['groupId'] } },
    };

    customRender(
      <Router history={history}>
        <GroupPage />
      </Router>,
      { preloadedState }
    );
  }

  const date = Date.now();
  const mockGroup = {
    name: 'fake group',
    createdAt: date,
    description: 'fake description',
    memberCount: 10,
    _id: 'groupId',
  };

  let mockFetchGroup;

  beforeEach(() => {
    mockFetchGroup = createSpy(
      utils,
      'fetchGroup',
      Promise.resolve({ data: { Group: mockGroup } })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockFetchGroup = null;
  });

  test('renders and sets the group on the intial setState call', async () => {
    await waitFor(() => setup());

    expect(screen.getAllByText('fake group', { exact: false })).toHaveLength(2);
  });
});
