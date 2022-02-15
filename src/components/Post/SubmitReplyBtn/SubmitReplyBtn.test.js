import {
  customRender,
  fireEvent,
  waitFor,
  createSpy,
  screen,
} from '../../../shared/testUtils';
import { submitReplyBtnUtils as utils } from './submitReplyBtnUtils';
import SubmitReplyBtn from './SubmitReplyBtn';

jest.mock('./submitReplyBtnUtils');

describe('<SubmitReplyBtn />', () => {
  let mockSubmitReply, mockEditPost;

  beforeEach(() => {
    mockSubmitReply = createSpy(utils, 'submitReply', Promise.resolve({}));
    mockEditPost = createSpy(utils, 'editPost', Promise.resolve({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockSubmitReply = null;
    mockEditPost = null;
  });

  function setup(inEditMode, forInitialPost) {
    const props = {
      reply: 'reply',
      post: {
        _id: 'postId',
        thread: 'threadId',
      },
      closeReplyBox: jest.fn(),
      reloadThread: jest.fn(),
      forInitialPost,
      clearReplyInput: jest.fn(),
      inEditMode,
    };

    customRender(<SubmitReplyBtn {...props} />);

    return props;
  }

  test('If rendered without a reply prop, the btn is disabled', () => {
    customRender(<SubmitReplyBtn />);
    const btn = screen.getByRole('button');

    expect(btn).toHaveAttribute('disabled');
  });

  test('When the btn is clicked, if there is a post, and inEditMode is false, submitPost is called', async () => {
    setup(false, false);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockSubmitReply).toBeCalledWith('reply', 'postId', 'threadId')
    );
  });

  test('if !forInitialPost, closeReplyBox and reloadThread are called', async () => {
    const props = setup(false, false);

    const { closeReplyBox, reloadThread } = props;

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockSubmitReply).toBeCalled());

    expect(closeReplyBox).toBeCalled();
    expect(reloadThread).toBeCalled();
  });

  test('If for initialPost, clearReply input is called', async () => {
    const props = setup(false, true);

    const { clearReplyInput } = props;

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockSubmitReply).toBeCalled());

    expect(clearReplyInput).toBeCalled();
  });

  test('If inEditMode, button reads Submit changes and calls editPost', async () => {
    setup(true, true);

    const btn = screen.getByText('Submit changes');

    fireEvent.click(btn);

    await waitFor(() => expect(mockEditPost).toBeCalledWith('reply', 'postId'));
  });
});
