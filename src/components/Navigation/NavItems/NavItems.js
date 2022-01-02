import { BiHomeSmile } from 'react-icons/bi';
import { useSelector } from 'react-redux';

import GroupDropdown from './GroupDropdown/GroupDropdown';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';

export default function NavItems() {
  const { user } = useSelector((state) => state.auth);
  return (
    <ul data-testid="NavItems" className={classes.NavItems}>
      {user ? (
        <>
          <NavItem link="/">
            <BiHomeSmile />
          </NavItem>
          <NavItem link="logout">Logout</NavItem>
          <GroupDropdown />
        </>
      ) : (
        <>
          <NavItem link="/">
            <BiHomeSmile />
          </NavItem>
          <NavItem link="login">Login</NavItem>
        </>
      )}
    </ul>
  );
}
