import {
  customRender,
  screen,
  fireEvent,
  createSpy,
  waitFor,
} from '../../shared/testUtils';
import { mockInitialPost } from '../../shared/mockThread';
import { submitReplyBtnUtils as utils } from './SubmitReplyBtn/submitReplyBtnUtils';
import Post from './Post';

jest.mock('./SubmitReplyBtn/submitReplyBtnUtils.js');

describe('<Post />', () => {
  function setup(userId, post) {
    const preloadedState = { auth: { user: { _id: userId } } };

    const props = { post, reloadThread: jest.fn() };

    customRender(<Post {...props} />, { preloadedState });

    return props.reloadThread;
  }

  test('renders, and shows vote button if user is not post author', () => {
    setup('mockUser2', mockInitialPost);

    expect(screen.getByText('mockUser1')).toBeInTheDocument();
    expect(screen.getByText('mock post 1 content')).toBeInTheDocument();
    expect(screen.getByTestId('VoteBtns')).toBeInTheDocument();
  });

  test('renders and does not show to vote btns if user is author', () => {
    setup('mockUser1', mockInitialPost.replies[0]);

    expect(screen.getByText('mockUser1')).toBeInTheDocument();
    expect(screen.getByText('mock reply 1 content')).toBeInTheDocument();

    expect(screen.queryByTestId('VoteBtns')).not.toBeInTheDocument();
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

    let mockSubmitReply = createSpy(utils, 'submitReply', Promise.resolve({}));

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
});
