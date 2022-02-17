import { useEffect, useState } from 'react';

import classes from './BackToTopBtn.module.css';

export default function BackToTopBtn() {
  const [show, setShow] = useState(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    function detectScrollPosition() {
      const { scrollY } = window;

      // If scrollY is not 0, the user is not at the top of the page
      setShow(scrollY !== 0);
    }
    document.addEventListener('scroll', detectScrollPosition);

    return () => document.removeEventListener('scroll', detectScrollPosition);
  }, []);

  return (
    show && (
      <button onClick={scrollToTop} className={`Global-btn-1 ${classes.Btn}`}>
        Back to top
      </button>
    )
  );
}
