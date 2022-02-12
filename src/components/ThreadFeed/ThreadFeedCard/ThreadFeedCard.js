import { useSelector } from 'react-redux';
import { BsChatRightText } from 'react-icons/bs';
import { useHistory, Link } from 'react-router-dom';
import slugify from 'slugify';

import PostDate from '../../Post/PostDate/PostDate';
import VoteBtns from '../../Post/VoteBtns/VoteBtns';
import postClasses from '../../Post/Post.module.css';
import classes from './ThreadFeedCard.module.css';

export default function ThreadFeedCard({ post, thread }) {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const { group } = thread;

  function redirectToThreadDetail() {
    // The Thread componenet used the initialPost property as the initialPostId
    // To make an API call to fetch all posts
    const threadState = { ...thread, initialPost: thread.initialPost._id };

    history.push(`/thread/${slugify(thread.title)}`, { thread: threadState });
  }

  console.log(thread);

  return (
    <div className={classes.PageFeedCard}>
      <div className={classes.Left}>
        {user && (
          <VoteBtns post={post} vertical threadScore={thread.likeScore} />
        )}
      </div>

      <div className={classes.Right}>
        <div className={postClasses.PostHeader}>
          <Link
            className={classes.Group}
            to={{
              pathname: `/group/${group.name}`,
              state: { groupId: group._id },
            }}
          >
            <p>r/{group.name}</p>
          </Link>
          <p className={classes.Author}>Posted by: {post.author.name}</p>
          <PostDate postTimeStamp={post.createdAt} />
        </div>
        <div onClick={redirectToThreadDetail} style={{ cursor: 'pointer' }}>
          <div className={classes.TitleWrapper}>
            <h4 className={classes.Title}>{thread.title}</h4>
          </div>
          <div className={classes.PostContent}>
            <span>{post.content}</span>
            <div className={classes.Blur}></div>
          </div>
        </div>
        <div className={postClasses.OptionsRow}>
          <Link
            to={{
              pathname: `/thread/${slugify(thread.title)}`,
              hash: 'comments',
              state: {
                thread: { ...thread, initialPost: thread.initialPost._id },
                scrollToComments: true,
              },
            }}
          >
            <span className={postClasses.NumComments}>
              <BsChatRightText size={16} />
              <span>{thread.numComments} Comments</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
