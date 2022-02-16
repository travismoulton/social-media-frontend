import { customRender, screen } from '../../../shared/testUtils';
import OptionsRow from './OptionsRow';
import {
  mockInitialPost,
  mockAuthor2,
  mockAuthor1,
} from '../../../shared/mockThread';

describe('<OptionsRow />', () => {
  const preloadedState = { auth: { user: mockAuthor1 } };
  const props = {
    user: mockAuthor1,
    post: mockInitialPost,
    numComments: 10,
    forInitialPost: true,
  };

  test('If for initialPost VoteBtn is not rendered, and the Comments span is', () => {
    customRender(<OptionsRow {...props} />, { preloadedState });

    const voteBtns = screen.queryByTestId('VoteBtns');
    expect(voteBtns).not.toBeInTheDocument();

    expect(screen.getByText('10 Comments')).toBeInTheDocument();
  });

  test('If not forInitialPost, Vote Buttons as well as reply button are displayed and NumComments is not', () => {
    const newProps = { ...props, forInitialPost: false };
    customRender(<OptionsRow {...newProps} />, { preloadedState });

    const voteBtns = screen.getByTestId('VoteBtns');
    expect(voteBtns).toBeInTheDocument();
    expect(screen.getByText('Reply')).toBeInTheDocument();

    expect(screen.queryByText('10 Comments')).not.toBeInTheDocument();
  });

  test('If current user is not the author, delete post and edit post buttons are not present', () => {
    const newProps = { ...props, user: mockAuthor2 };
    customRender(<OptionsRow {...newProps} />, { preloadedState });

    expect(screen.queryByText('Delete post')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit post')).not.toBeInTheDocument();
  });

  test('If current user is author, edit post and delete post buttons are present', async () => {
    customRender(<OptionsRow {...props} />, { preloadedState });

    expect(screen.getByText('Delete post')).toBeInTheDocument();
    expect(screen.getByText('Edit post')).toBeInTheDocument();
  });

  test('If there is no user, vote buttons are not rendered', () => {
    const newProps = { ...props, user: false };
    customRender(<OptionsRow {...newProps} />, { preloadedState });

    const voteBtns = screen.queryByTestId('VoteBtns');
    expect(voteBtns).not.toBeInTheDocument();

    expect(screen.queryByText('Reply')).not.toBeInTheDocument();
  });
});
