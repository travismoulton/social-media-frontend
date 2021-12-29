import NavBar from '../Navigation/NavBar/NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
