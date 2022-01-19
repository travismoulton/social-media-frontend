import * as reactRedux from 'react-redux';

import { membershipBtnUtils as btnUtils } from './membershipBtnUtils';
import {
  customRender,
  screen,
  createSpy,
  waitFor,
  fireEvent,
} from '../../../../shared/testUtils';
import MembershipBtn from './MembershipBtn';

import * as mockActions from '../../../../store/authSlice';

jest.mock('./membershipBtnUtils');

describe('<M<embershipBtn />', () => {
  async function setup(isMember) {
    const mockGroup = {
      name: 'fake group',
      createdAt: date,
      description: 'fake description',
      memberCount: 10,
      _id: 'groupId',
    };

    const preloadedState = {
      auth: { user: { groupMemberships: [isMember && 'groupId'] } },
    };

    customRender(<MembershipBtn group={mockGroup} />, { preloadedState });
  }

  const date = Date.now();

  let mockJoinGroup,
    mockLeaveGroup,
    dummyDispatch,
    mockUseDispatch,
    mockRemoveMembership,
    mockAddMembership;

  beforeEach(() => {
    dummyDispatch = jest.fn();
    mockUseDispatch = createSpy(reactRedux, 'useDispatch', dummyDispatch);

    mockRemoveMembership = createSpy(mockActions, 'removeUserMembership', {});
    mockAddMembership = createSpy(mockActions, 'addGroupMembership', {});

    mockJoinGroup = createSpy(
      btnUtils,
      'createMembership',
      Promise.resolve({})
    );

    mockLeaveGroup = createSpy(
      btnUtils,
      'deleteMembership',
      Promise.resolve({})
    );
  });

  afterEach(() => {
    jest.clearAllMocks();

    mockJoinGroup = null;
    mockLeaveGroup = null;
    dummyDispatch = null;
    mockUseDispatch = null;
    mockRemoveMembership = null;
    mockAddMembership = null;
  });

  test('calls leave group when membership button is clicked, and user is a member of that group', async () => {
    await waitFor(() => setup(true));

    const btn = screen.getByText('Leave Group');
    fireEvent.click(btn);

    await waitFor(() => expect(mockLeaveGroup).toBeCalled());
    await waitFor(() => expect(mockRemoveMembership).toBeCalled());
  });

  test('if user is not a member of that group, Join group button is displayed an correct api call is made on click', async () => {
    await waitFor(() => setup(false));

    const btn = screen.getByText('Join Group');
    fireEvent.click(btn);

    await waitFor(() => expect(mockJoinGroup).toBeCalled());
    await waitFor(() => expect(mockAddMembership).toBeCalled());
  });
});
