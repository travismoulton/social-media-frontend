import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';

export default function NavItems() {
  return (
    <ul data-testid="NavItems" className={classes.NavItems}>
      <NavItem link="login">Login</NavItem>
    </ul>
  );
}
