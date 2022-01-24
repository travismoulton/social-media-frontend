import { customRender, screen, fireEvent } from '../../shared/testUtils';
import ReplyChain from './ReplyChain';
import Post from '../Post/Post';
import { mockInitialPost } from '../Thread/mockThread';

describe('<ReplyChain />', () => {
  function setup() {
    const reloadThread = jest.fn();

    const postOneProps = { post: mockInitialPost.replies[0], reloadThread };
    const postTwoProps = {
      post: mockInitialPost.replies[0].replies[0],
      reloadThread,
    };

    const posts = [<Post {...postOneProps} />, <Post {...postTwoProps} />];

    const preloadedState = { auth: { user: { _id: 'mockUser1' } } };

    customRender(<ReplyChain posts={posts} numPosts={2} />, { preloadedState });
  }

  test('hides the div when the hide button is clicked', () => {
    setup();

    const div = screen.getByTestId('ReplyChainContainer');
    expect(div).not.toHaveAttribute('hidden');

    const btn = screen.getByText('Hide replies');
    fireEvent.click(btn);

    expect(div).toHaveAttribute('hidden');
  });

  test('when div is hidden, the show replies button displays the correct text', () => {
    setup();

    const btn = screen.getByText('Hide replies');
    fireEvent.click(btn);

    expect(screen.getByText('Show 2 replies')).toBeInTheDocument();
  });

  test('the sidebar toggles the hidden attribute', () => {
    setup();

    const div = screen.getByTestId('ReplyChainContainer');
    expect(div).not.toHaveAttribute('hidden');

    const sideBar = screen.getByTestId('ReplyChainSideBar');
    fireEvent.click(sideBar);

    expect(div).toHaveAttribute('hidden');
  });
});
