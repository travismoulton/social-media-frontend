import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import CreatePostBanner from './CreatePostBanner';
import { customRender, screen, fireEvent } from '../../shared/testUtils';

describe('<CreatePostBanner />', () => {
  test('renders', () => {
    customRender(<CreatePostBanner />);

    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('If no group prop, redirects to createThread', () => {
    const history = createMemoryHistory();

    customRender(
      <Router history={history}>
        <CreatePostBanner />
      </Router>
    );

    fireEvent.click(screen.getByText('Create Post'));

    expect(history.location.pathname).toEqual('/createThread');
  });

  test('If there is a group, redirects to proper URL', () => {
    const history = createMemoryHistory();
    const group = {
      name: 'mockGroup',
    };

    customRender(
      <Router history={history}>
        <CreatePostBanner group={group} />
      </Router>
    );

    fireEvent.click(screen.getByText('Create Post'));

    expect(history.location.pathname).toEqual('/group/mockGroup/createThread');
  });
});
