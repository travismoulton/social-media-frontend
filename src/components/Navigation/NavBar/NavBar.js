import classes from './NavBar.module.css';
import NavItems from '../NavItems/NavItems';

export default function NavBar() {
  return (
    <header className={classes.Nav}>
      <nav data-testid="Nav" className={classes.NavBar}>
        <NavItems />
      </nav>
    </header>
  );
}
