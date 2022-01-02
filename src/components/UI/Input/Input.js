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
    className,
    label,
  } = props;

  const inputClasses = [classes[className] || className];

  switch (elementType) {
    case 'input':
      if (['text', 'password', 'email'].includes(elementConfig.type))
        inputClasses.push(classes.TextInput);

      inputElement = (
        <div className={classes[wrapperClass]}>
          {label && <label htmlFor={id}>{label}</label>}

          <input
            {...elementConfig}
            value={value}
            onChange={changed}
            autoComplete="false"
            id={id}
            className={inputClasses.join(' ')}
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
