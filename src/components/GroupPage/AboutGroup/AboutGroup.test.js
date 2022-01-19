import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { customRender, screen, fireEvent } from '../../../shared/testUtils';
import AboutGroup from './AboutGroup';

const mockGroup = {
  name: 'fake group',
  createdAt: new Date('January 19, 2022'),
  description: 'fake description',
  memberCount: 10,
  _id: 'groupId',
};

describe('<AboutGroup />', () => {
  test('renders and displays the correct date', () => {
    const history = createMemoryHistory();

    customRender(
      <Router history={history}>
        <AboutGroup group={mockGroup} />
      </Router>
    );

    expect(screen.getByText('About fake group')).toBeInTheDocument();
    expect(screen.getByText('Created Jan 19, 2022')).toBeInTheDocument();
    expect(screen.getByText('Number of members: 10')).toBeInTheDocument();
    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('create post btn redirects to the right page', () => {
    const history = createMemoryHistory();

    customRender(
      <Router history={history}>
        <AboutGroup group={mockGroup} />
      </Router>
    );

    const btn = screen.getByText('Create Post');

    fireEvent.click(btn);

    expect(history.location.pathname).toBe('/group/fake-group/createThread');
  });
});
