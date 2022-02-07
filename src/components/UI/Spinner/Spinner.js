import classes from './Spinner.module.css';

const Spinner = () => (
  <div data-testid="Spinner" className={classes.loader}>
    Loading...
  </div>
);

export default Spinner;
