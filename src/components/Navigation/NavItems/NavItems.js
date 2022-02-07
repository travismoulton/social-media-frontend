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
          <NavItem link="/">
            <BiHomeSmile />
          </NavItem>
          <NavItem link="/logout">Logout</NavItem>
          <GroupDropdown fromNavBar />
          <ShowCreateGroupBtn />
        </>
      ) : (
        <>
          <NavItem link="/">
            <BiHomeSmile />
          </NavItem>
          <NavItem link="/register">Register</NavItem>
          <NavItem link="/login">Login</NavItem>
        </>
      )}
    </ul>
  );
}
