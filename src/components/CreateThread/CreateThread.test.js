import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { customRender, screen, fireEvent } from '../../shared/testUtils';
import CreateThread from './CreateThread';

describe('<CreateThread />', () => {
  const date = Date.now();
  const mockGroup = {
    name: 'fake group',
    createdAt: date,
    description: 'fake description',
    memberCount: 10,
    _id: 'groupId',
  };

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

  test('if the CreateThread btn is clicked with no title or post content, the error is displayed', () => {
    setup();

    const btn = screen.getByText('Create Thread');
    fireEvent.click(btn);

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Post can not be empty')).toBeInTheDocument();
  });
});
