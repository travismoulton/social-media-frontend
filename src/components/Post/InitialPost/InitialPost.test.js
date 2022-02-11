/* eslint-disable testing-library/no-wait-for-side-effects */
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import {
  customRender,
  screen,
  fireEvent,
  createSpy,
  waitFor,
} from '../../../shared/testUtils';
import { mockInitialPost } from '../../../shared/mockThread';
import { postUtils } from '../postUtils';
import { submitReplyBtnUtils as utils } from '../SubmitReplyBtn/submitReplyBtnUtils';
import InitialPost from './InitialPost';

jest.mock('../SubmitReplyBtn/submitReplyBtnUtils.js');
jest.mock('../postUtils');

describe('<InitialPost />', () => {
  function setup(userId, post) {
    const preloadedState = { auth: { user: { _id: userId } } };

    const props = { post, reloadThread: jest.fn() };

    const history = createMemoryHistory();
    history.location.state = {};

    // if userId is passed as null, render without redux state
    userId
      ? customRender(<InitialPost {...props} />, { preloadedState })
      : // When loaded without a user, the component needs a Router and history object, otherwise
        // the LoginOrRegister component throws an error
        customRender(
          <Router history={history}>
            <InitialPost {...props} />
          </Router>
        );

    return props.reloadThread;
  }

  test('renders, and shows vote button if there is a user', () => {
    setup('mockUser2', mockInitialPost);

    expect(screen.getByText('mockUser1')).toBeInTheDocument();
    expect(screen.getByText('mock post 1 content')).toBeInTheDocument();
    expect(screen.getByTestId('VoteBtns')).toBeInTheDocument();
  });

  test('renders and does not show to vote btns if there is no user', () => {
    setup(null, mockInitialPost.replies[0]);

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

  test('when the edit button is clicked, the EditPostWrapper is rendered, and can be used to edit the post', async () => {
    const mockEditPost = createSpy(utils, 'editPost', Promise.resolve({}));

    setup('mockUser1', mockInitialPost);

    await waitFor(() => fireEvent.click(screen.getByText('Edit post')));

    const textArea = screen.getByTestId('createReply');
    expect(textArea).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.change(textArea, { target: { value: 'Edit post' } })
    );

    await waitFor(() => fireEvent.click(screen.getByText('Submit changes')));

    expect(mockEditPost).toBeCalled();

    // After the edit is submitted, the ReplyInput should be removed from the DOM
    expect(textArea).not.toBeInTheDocument();
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
});
