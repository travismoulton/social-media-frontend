import classes from './Input.module.css';

export default function Input(props) {
  let inputElement = null;

  const { elementType, elementConfig, value, changed, id, wrapperClass } =
    props;

  switch (elementType) {
    case 'input':
      inputElement = (
        <div className={classes[wrapperClass]}>
          <input
            {...elementConfig}
            value={value}
            onChange={changed}
            autoComplete="false"
            id={id}
          />
        </div>
      );
      break;
    default:
      inputElement = <p>Something went wrong</p>;
  }

  return inputElement;
}
