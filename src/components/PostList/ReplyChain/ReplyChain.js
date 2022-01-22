import { useState } from 'react';

export default function ReplyChain({ posts, numPosts }) {
  const [show, setShow] = useState(true);
  // console.log(firstPost.content);

  // function generateMarginBasedOnNestLevel() {
  //   const nestLevel = firstPost.ancestors.length - 1;
  //   const margin = 1 * nestLevel;
  //   return `${margin.toString()}rem`;
  // }

  const btn = (
    <button onClick={() => setShow((show) => !show)}>
      {show ? 'Hide replies' : `Show ${numPosts} replies`}
    </button>
  );

  return (
    <div
      style={{
        borderLeft: '1px solid #333',
        marginLeft: '2rem',
      }}
    >
      {btn}
      <div hidden={!show}>{posts}</div>
    </div>
  );
}
