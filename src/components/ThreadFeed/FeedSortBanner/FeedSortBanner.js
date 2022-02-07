import classes from './FeedSortBanner.module.css';

export default function FeedSortBanner({ currentSortOrder, updateSortOrder }) {
  function clickHandler(sortOrder) {
    if (currentSortOrder !== sortOrder) updateSortOrder(sortOrder);
  }
  const sortByMostPopularBtn = (
    <button
      className={`Global-btn-1 ${classes.Btn}`}
      onClick={() => clickHandler('-likeScore,createdAt')}
    >
      Sort by most popular
    </button>
  );

  const sortByNewestBtn = (
    <button
      className={`Global-btn-1 ${classes.Btn}`}
      onClick={() => clickHandler('-createdAt,-likeScore')}
    >
      Sort by newest
    </button>
  );

  const sortByOldestBtn = (
    <button
      className={`Global-btn-1 ${classes.Btn}`}
      onClick={() => clickHandler('createdAt,-likeScore')}
    >
      Sort by oldest
    </button>
  );

  return (
    <div className={classes.Banner}>
      {sortByMostPopularBtn} {sortByNewestBtn} {sortByOldestBtn}
    </div>
  );
}
