import classes from './Input.module.css';
import CustomSelect from './CustomSelect/CustomSelect';

export default function Input(props) {
  let inputElement = null;

  const {
    elementType,
    elementConfig,
    value,
    changed,
    id,
    wrapperClass,
    isSearchable,
  } = props;

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

    case 'select':
      inputElement = (
        <div className={classes.SelectWrapper}>
          <CustomSelect
            changed={changed}
            options={elementConfig.options}
            value={value}
            isSearchable={isSearchable}
          />
        </div>
      );

      break;
    default:
      inputElement = <p>Something went wrong</p>;
  }

  return inputElement;
}
