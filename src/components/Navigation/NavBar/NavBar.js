import classes from './NavBar.module.css';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import GroupDropdown from '../../GroupDropdown/GroupDropdown';

export default function NavBar({ isAuthenticated, toggleSideBar }) {
  return (
    <header className={classes.Nav}>
      <nav data-testid="Nav" className={`${classes.NavBar} ${classes.Desktop}`}>
        <NavItems isAuthenticated={isAuthenticated} />
      </nav>
      <nav data-testid="Nav" className={`${classes.NavBar} ${classes.Mobile}`}>
        <DrawerToggle clicked={toggleSideBar} />
        <GroupDropdown fromNavBar />
      </nav>
    </header>
  );
}
