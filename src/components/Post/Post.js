import classes from './Post.module.css';

export default function Post({ post }) {
  console.log(post);
  return (
    <div className={classes.Post}>
      <div className={classes.PostHeader}>{post.author.name}</div>
      <div className={classes.PostContent}>{post.content}</div>
    </div>
  );
}
