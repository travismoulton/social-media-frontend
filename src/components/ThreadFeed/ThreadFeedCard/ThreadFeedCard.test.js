import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ThreadFeedCard from './ThreadFeedCard';
import { customRender, screen, fireEvent } from '../../../shared/testUtils';
import { mockThreads } from '../../../shared/mockThreadFeed';

describe('<ThreadFeedCard />', () => {
  function setup(withUser) {
    const history = createMemoryHistory();

    const preloadedState = { auth: { user: { groupMemeberships: [] } } };

    const thread = mockThreads[0];
    const { initialPost: post } = thread;
    const props = { thread, post };

    withUser
      ? customRender(
          <Router history={history}>
            <ThreadFeedCard {...props} />
          </Router>,
          { preloadedState }
        )
      : customRender(
          <Router history={history}>
            <ThreadFeedCard {...props} />
          </Router>
        );

    return history;
  }

  test('renders', () => {
    setup(true);

    expect(screen.getByTestId('VoteBtns')).toBeInTheDocument();
    expect(screen.getByText('r/groupOne')).toBeInTheDocument();
    expect(screen.getByText('Posted by: Travis')).toBeInTheDocument();
    expect(screen.getByText('mockThread1')).toBeInTheDocument();
    expect(screen.getByText('first mock post')).toBeInTheDocument();
  });

  test('If there is no user, renders without the votebtns', () => {
    setup();

    expect(screen.queryByTestId('VoteBtns')).not.toBeInTheDocument();
  });

  test('clicking the groupName link redirects to the correct page', () => {
    const history = setup(true);

    fireEvent.click(screen.getByText('r/groupOne'));

    expect(history.location.pathname).toEqual('/group/groupOne');
  });

  test('Clicking on the comments button redirects to the thread detail with the comments hash', () => {
    const history = setup(true);
    fireEvent.click(screen.getByText('Comments', { exact: false }));
    expect(history.location.pathname).toEqual('/thread/mockThread1');
    expect(history.location.state).toEqual({
      scrollToComments: true,
      thread: {
        group: {
          _id: 'groupOne',
          name: 'groupOne',
        },
        initialPost: 'initialPostOne',
        likeScore: '1',
        numComments: '1',
        title: 'mockThread1',
      },
    });
  });
});
