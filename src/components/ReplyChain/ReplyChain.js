import { useState } from 'react';
import classes from './ReplyChain.module.css';

export default function ReplyChain({ posts, numPosts, forInitialPost }) {
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
      data-testid="ReplyChainSideBar"
    >
      <div className={classes.SideBar}></div>
    </div>
  );

  // For the reply chain to the first post, do not show the hide replies button,
  // apply the left margin, or the sidebar
  return (
    <div
      style={{
        position: 'relative',
        marginLeft: !forInitialPost && '2rem',
      }}
    >
      {!forInitialPost && hideReplyBar}
      {!forInitialPost && btn}
      <div data-testid="ReplyChainContainer" hidden={!show}>
        {posts}
      </div>
    </div>
  );
}
