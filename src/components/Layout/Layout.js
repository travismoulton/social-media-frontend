import NavBar from '../Navigation/NavBar/NavBar';
import classes from './Layout.module.css';

export default function Layout({ children, isAuthenticated }) {
  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <main className={classes.Main}>{children}</main>
    </>
  );
}
