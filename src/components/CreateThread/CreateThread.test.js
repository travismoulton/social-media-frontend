import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import {
  customRender,
  screen,
  fireEvent,
  waitFor,
  createSpy,
  cre,
} from '../../shared/testUtils';
import CreateThread from './CreateThread';
import { utils } from '../GroupDropdown/groupDropdownUtils';

jest.mock('../GroupDropdown/groupDropdownUtils');

const mockGroups = [
  { groupOne: { _id: 'groupOne', name: 'groupOne' } },
  { groupTwo: { _id: 'groupTwo', name: 'groupTwo' } },
  { groupThree: { _id: 'groupThree', name: 'groupThree' } },
  { groupFour: { _id: 'groupFour', name: 'groupFour' } },
];
describe('<CreateThread />', () => {
  const date = Date.now();
  const mockGroup = {
    name: 'fake group',
    createdAt: date,
    description: 'fake description',
    memberCount: 10,
    _id: 'groupId',
  };

  let mockFetchGroups;
  beforeEach(() => {
    mockFetchGroups = createSpy(
      utils,
      'fetchAllGroups',
      Promise.resolve({ data: mockGroups })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockFetchGroups = null;
  });

  function setup() {
    const history = createMemoryHistory();
    history.location.state = { group: mockGroup };

    customRender(
      <Router history={history}>
        <CreateThread />
      </Router>
    );
  }

  test('renders', () => {
    setup();

    expect(screen.getByText('Create Thread')).toBeInTheDocument();
  });
});
