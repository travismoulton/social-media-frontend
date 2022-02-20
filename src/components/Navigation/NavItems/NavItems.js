import { BiHomeSmile } from 'react-icons/bi';

import GroupDropdown from '../../GroupDropdown/GroupDropdown';
import NavItem from './NavItem/NavItem';
import ShowCreateGroupBtn from './ShowCreateGroupBtn/ShowCreateGroupBtn';
import classes from './NavItems.module.css';

export default function NavItems({ isAuthenticated }) {
  return (
    <ul data-testid="NavItems" className={classes.NavItems}>
      {isAuthenticated ? (
        <>
          <span className={classes.NavItemsLeft}>
            <NavItem link="/">
              <BiHomeSmile /> Home
            </NavItem>
            <GroupDropdown fromNavBar />
          </span>
          <span className={classes.NavItemsRight}>
            <ShowCreateGroupBtn />
            <NavItem link="/logout">Logout</NavItem>
          </span>
        </>
      ) : (
        <>
          <NavItem link="/">
            <BiHomeSmile /> Home
          </NavItem>
          <span className={classes.UnauthenticatedRight}>
            <NavItem link="/register">Register</NavItem>
            <NavItem link="/login">Login</NavItem>
          </span>
        </>
      )}
    </ul>
  );
}
