import classes from './Spinner.module.css';

const Spinner = ({ initialLoad }) => (
  <div
    data-testid="Spinner"
    className={
      initialLoad ? `${classes.loader} ${classes.white}` : classes.loader
    }
  >
    Loading...
  </div>
);

export default Spinner;
