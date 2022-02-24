import { BiHomeSmile } from 'react-icons/bi';

import GroupDropdown from '../../GroupDropdown/GroupDropdown';
import NavItem from './NavItem/NavItem';
import ShowCreateGroupBtn from './ShowCreateGroupBtn/ShowCreateGroupBtn';
import ContinueAsGuest from './ContinueAsGuest/ContinueAsGuest';
import classes from './NavItems.module.css';

export default function NavItems({ isAuthenticated, inSideBar }) {
  return !inSideBar ? (
    <>
      <ul data-testid="NavItems" className={classes.NavItems}>
        {isAuthenticated ? (
          <>
            <NavItem link="/">
              <BiHomeSmile /> Home
            </NavItem>
            <GroupDropdown fromNavBar />

            <ShowCreateGroupBtn />
            <NavItem link="/logout">Logout</NavItem>
          </>
        ) : (
          <>
            <NavItem link="/">
              <BiHomeSmile /> Home
            </NavItem>
            <NavItem link="/register">Register</NavItem>
            <ContinueAsGuest fromNavBar />
            <NavItem link="/login">Login</NavItem>
          </>
        )}
      </ul>
    </>
  ) : (
    <>
      <ul data-testid="NavItems" className={classes.InSideBar}>
        {isAuthenticated ? (
          <>
            <NavItem link="/">
              <BiHomeSmile /> Home
            </NavItem>
            <ShowCreateGroupBtn />
            <NavItem link="/logout">Logout</NavItem>
          </>
        ) : (
          <>
            <NavItem link="/">
              <BiHomeSmile /> Home
            </NavItem>
            <NavItem link="/register">Register</NavItem>
            <ContinueAsGuest fromNavBar />
            <NavItem link="/login">Login</NavItem>
          </>
        )}
      </ul>
    </>
  );
}
