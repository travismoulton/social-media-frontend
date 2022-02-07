import Post from '../Post/Post';
import ReplyChain from '../ReplyChain/ReplyChain';
import classes from './PostList.module.css';

export default function PostList({ posts, reloadThread }) {
  function preparePosts(posts) {
    if (Array.isArray(posts)) {
      return (
        <ReplyChain
          key={`ReplyChain--${posts[0]._id}`}
          posts={posts.map((post) => preparePosts(post))}
          numPosts={posts.flat(Infinity).length}
        />
      );
    } else {
      return <Post post={posts} key={posts.id} reloadThread={reloadThread} />;
    }
  }

  return (
    <div className={classes.PostList}>
      {posts.map((post) => preparePosts(post))}
    </div>
  );
}
