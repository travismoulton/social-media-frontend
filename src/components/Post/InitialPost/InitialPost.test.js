import {
  customRender,
  screen,
  fireEvent,
  createSpy,
  waitFor,
} from '../../../shared/testUtils';
import { mockInitialPost } from '../../../shared/mockThread';
import { submitReplyBtnUtils as utils } from '../SubmitReplyBtn/submitReplyBtnUtils';
import InitialPost from './InitialPost';

jest.mock('../SubmitReplyBtn/submitReplyBtnUtils.js');

describe('<InitialPost />', () => {
  function setup(userId, post) {
    const preloadedState = { auth: { user: { _id: userId } } };

    const props = { post, reloadThread: jest.fn() };

    customRender(<InitialPost {...props} />, { preloadedState });

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

  test('if there is no input value in the ReplyBox, the submit button is disabled', () => {
    setup('mockUser2', mockInitialPost);

    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
  });

  test("after a reply is submitted, submit reply is called and the replyBox is cleared of it's value", async () => {
    const reloadThread = setup('mockUser2', mockInitialPost);

    let mockSubmitReply = createSpy(utils, 'submitReply', Promise.resolve({}));

    const submitBtn = screen.getByText('Submit');

    const textArea = screen.getByTestId('createReply');

    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(textArea, { target: { value: 'Reply content' } })
    );

    fireEvent.click(submitBtn);

    await waitFor(() =>
      expect(mockSubmitReply).toBeCalledWith(
        'Reply content',
        'mockPost1',
        'mockThread'
      )
    );
    await waitFor(() => expect(reloadThread).toBeCalled());

    // The text area should be closed after the post is submitted
    expect(textArea).toHaveValue('');
  });
});
