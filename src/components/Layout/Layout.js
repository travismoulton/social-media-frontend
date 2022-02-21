import { useState } from 'react';

import SideBar from '../Navigation/SideBar/SideBar';
import NavBar from '../Navigation/NavBar/NavBar';
import classes from './Layout.module.css';

export default function Layout({ children, isAuthenticated }) {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      <NavBar
        isAuthenticated={isAuthenticated}
        toggleSideBar={() => setShowSideBar((prevShow) => !prevShow)}
      />
      <SideBar
        show={showSideBar}
        closed={() => setShowSideBar(false)}
        isAuthenticated={isAuthenticated}
      />

      <main data-testid="main" className={classes.Main}>
        {children}
      </main>
    </>
  );
}
