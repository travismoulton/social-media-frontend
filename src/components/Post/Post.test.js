import {
  customRender,
  screen,
  fireEvent,
  createSpy,
  waitFor,
} from '../../shared/testUtils';
import { mockInitialPost } from '../../shared/mockThread';
import { submitReplyBtnUtils as utils } from './SubmitReplyBtn/submitReplyBtnUtils';
import { postUtils } from './postUtils';
import Post from './Post';

jest.mock('./SubmitReplyBtn/submitReplyBtnUtils.js');
jest.mock('./postUtils');

describe('<Post />', () => {
  function setup(userId, post) {
    const preloadedState = { auth: { user: { _id: userId } } };

    const props = { post, reloadThread: jest.fn() };

    // Render the component without a user if null is passed for the userId
    userId
      ? customRender(<Post {...props} />, { preloadedState })
      : customRender(<Post {...props} />);

    return props.reloadThread;
  }

  test('renders, and shows vote button if there is a user, and does not render edit and delete buttons if the user is not the author', () => {
    setup('mockUser2', mockInitialPost);

    expect(screen.getByText('mockUser1')).toBeInTheDocument();
    expect(screen.getByText('mock post 1 content')).toBeInTheDocument();
    expect(screen.getByTestId('VoteBtns')).toBeInTheDocument();

    expect(screen.queryByText('Delete post')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit post')).not.toBeInTheDocument();
  });

  test('renders and does not show to vote btns if there is no user', () => {
    setup(null, mockInitialPost.replies[0]);

    expect(screen.getByText('mockUser1')).toBeInTheDocument();
    expect(screen.getByText('mock reply 1 content')).toBeInTheDocument();

    expect(screen.queryByTestId('VoteBtns')).not.toBeInTheDocument();
  });

  test('delete post button makes api call to delete the post', async () => {
    const mockDeletePost = createSpy(
      postUtils,
      'deletePost',
      Promise.resolve({})
    );

    setup('mockUser1', mockInitialPost);

    fireEvent.click(screen.getByText('Delete post'));

    await waitFor(() => expect(mockDeletePost).toBeCalled());
  });

  test('when the user clicks edit post, and then changes the post and clicks submit, editPost api call is made', async () => {
    const mockEditPost = createSpy(utils, 'editPost', Promise.resolve({}));

    setup('mockUser1', mockInitialPost);

    fireEvent.click(screen.getByText('Edit post'));

    const textArea = screen.getByTestId('createReply');

    fireEvent.change(textArea, { target: { value: 'Reply content edited' } });

    fireEvent.click(screen.getByText('Submit changes'));

    await waitFor(() => expect(mockEditPost).toBeCalled());
  });

  test('reply input is only shown after the button is clicked', () => {
    setup('mockUser2', mockInitialPost);

    expect(screen.queryByTestId('createReply')).not.toBeInTheDocument();

    const replyBtn = screen.getByText('Reply', { exact: false });
    fireEvent.click(replyBtn);

    expect(screen.getByTestId('createReply')).toBeInTheDocument();
  });

  test('if there is replyInput, the SubmitReplyBtn makes the API call and closes the reply box', async () => {
    const reloadThread = setup('mockUser2', mockInitialPost);

    const mockSubmitReply = createSpy(
      utils,
      'submitReply',
      Promise.resolve({})
    );

    const replyBtn = screen.getByText('Reply', { exact: false });
    fireEvent.click(replyBtn);

    const textArea = screen.getByTestId('createReply');

    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(textArea, { target: { value: 'Reply content' } })
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(mockSubmitReply).toBeCalledWith(
        'Reply content',
        'mockPost1',
        'mockThread'
      )
    );
    await waitFor(() => expect(reloadThread).toBeCalled());

    // The text area should be closed after the post is submitted
    expect(textArea).not.toBeInTheDocument();
  });

  test('When in the ReplyInput is open, clicking the cancel button closes it', () => {
    setup('mockUser2', mockInitialPost);

    fireEvent.click(screen.getByText('Reply'));

    const textArea = screen.getByTestId('createReply');
    expect(textArea).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(textArea).not.toBeInTheDocument();
  });
});
