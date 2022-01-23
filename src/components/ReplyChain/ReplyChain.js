import { useState } from 'react';
import classes from './ReplyChain.module.css';

export default function ReplyChain({ posts, numPosts }) {
  const [show, setShow] = useState(true);

  const btn = (
    <button onClick={() => setShow((show) => !show)}>
      {show ? 'Hide replies' : `Show ${numPosts} replies`}
    </button>
  );

  const hideReplyBar = (
    <div
      className={classes.SideBarWrapper}
      onClick={() => setShow((show) => !show)}
    >
      <div className={classes.SideBar}></div>
    </div>
  );

  return (
    <div
      style={{
        position: 'relative',
        marginLeft: '2rem',
      }}
    >
      {hideReplyBar}
      {btn}
      <div hidden={!show}>{posts}</div>
    </div>
  );
}
