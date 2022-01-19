import { customRender, screen } from '../../../shared/testUtils';
import GroupHeader from './GroupHeader';

describe('<GroupHeader />', () => {
  const mockGroup = {
    name: 'fake group',
    createdAt: new Date('January 19, 2022'),
    description: 'fake description',
    memberCount: 10,
    _id: 'groupId',
  };

  const preloadedState = {
    auth: { user: { groupMemberships: ['groupId'] } },
  };

  test('renders', () => {
    customRender(<GroupHeader group={mockGroup} />, { preloadedState });
    expect(screen.getByText('fake group')).toBeInTheDocument();
  });
});
