import { BiHomeSmile } from 'react-icons/bi';

import GroupDropdown from './GroupDropdown/GroupDropdown';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';

export default function NavItems() {
  return (
    <ul data-testid="NavItems" className={classes.NavItems}>
      <NavItem link="/">
        <BiHomeSmile />
      </NavItem>
      <NavItem link="login">Login</NavItem>
      <NavItem link="logout">Logout</NavItem>
      <GroupDropdown />
    </ul>
  );
}
