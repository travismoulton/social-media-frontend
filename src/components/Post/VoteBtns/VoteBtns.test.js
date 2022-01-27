import {
  customRender,
  screen,
  waitFor,
  fireEvent,
  createSpy,
} from '../../../shared/testUtils';
import { mockInitialPost } from '../../../shared/mockThread';

import VoteBtns from './VoteBtns';
import { voteBtnUtils as utils } from './voteBtnUtils';

jest.mock('./voteBtnUtils');

describe('<VoteBtns />', () => {
  let mockAddLike, mockAddDislike, mockRemoveLike, mockRemoveDislike;

  beforeEach(() => {
    function alterPost(deltaLikeScore) {
      return Promise.resolve({
        data: {
          post: {
            ...mockInitialPost,
            likeScore: mockInitialPost.likeScore + deltaLikeScore,
          },
        },
      });
    }

    mockAddLike = createSpy(utils, 'addLike', alterPost(1));
    mockAddDislike = createSpy(utils, 'addDislike', alterPost(-1));
    mockRemoveDislike = createSpy(utils, 'removeDislike', alterPost(1));
    mockRemoveLike = createSpy(utils, 'removeLike', alterPost(-1));
  });

  afterEach(() => {
    jest.clearAllMocks();

    mockAddLike = null;
    mockAddDislike = null;
    mockRemoveDislike = null;
    mockRemoveLike = null;
  });

  function setup(userId) {
    const preloadedState = { auth: { user: { _id: userId } } };
    customRender(<VoteBtns post={mockInitialPost} />, { preloadedState });
  }

  test('renders with the text vote if the user has neither like or disliked the post', () => {
    setup('mockUser3');
    expect(screen.getByText('Vote')).toBeInTheDocument();
  });

  test('renders with a correct likeScore if the user has voted for the psot', () => {
    setup('mockUser2');
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('if the user likes the post, and clicks the upvote btn, it calls removeLike and updates the post', async () => {
    setup('mockUser1');
    fireEvent.click(screen.getByTestId('upVote'));
    await waitFor(() => expect(mockRemoveLike).toBeCalled());

    // New likeScore should be -1
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  test('if user does not like the post and clicks the upVote button, addLike is called', async () => {
    setup('mockUser2');
    fireEvent.click(screen.getByTestId('upVote'));
    await waitFor(() => expect(mockAddLike).toBeCalled());
  });

  test('if the user dislikes the post and clicks the downVote btn, removeDislike is called', async () => {
    setup('mockUser2');
    fireEvent.click(screen.getByTestId('downVote'));
    await waitFor(() => expect(mockRemoveDislike).toBeCalled());
  });

  test('if the user does not dislike a post and clicks the downvote btn, addDislike is called', async () => {
    setup('mockUser1');
    fireEvent.click(screen.getByTestId('downVote'));
    await waitFor(() => expect(mockAddDislike).toBeCalled());
  });
});
