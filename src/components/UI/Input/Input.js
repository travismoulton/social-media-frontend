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
    invalid,
    touched,
    required,
    errorMsg,
  } = props;

  const inputClasses = [classes[className] || className];
  if (invalid && touched) inputClasses.push(classes.Invalid);

  switch (elementType) {
    case 'input':
      if (['text', 'password', 'email'].includes(elementConfig.type))
        inputClasses.push(classes.TextInput);

      inputElement = (
        <div className={classes[wrapperClass]} style={{ position: 'relative' }}>
          {label && <label htmlFor={id}>{label}</label>}

          <input
            {...elementConfig}
            value={value}
            onChange={changed}
            autoComplete="false"
            id={id}
            className={inputClasses.join(' ')}
            data-testid={id}
          />
          {required && <span className={classes.InputAsteric}>*</span>}
          {errorMsg && <p className={classes.InputError}>{errorMsg}</p>}
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

    case 'textarea':
      inputElement = (
        <div className={classes[wrapperClass]} style={{ position: 'relative' }}>
          {label && <label>{label}</label>}
          <textarea
            {...elementConfig}
            value={value}
            onChange={changed}
            autoComplete="false"
            className={inputClasses.join(' ')}
            data-testid={id}
            rows="4"
            cols="32"
            maxLength="128"
          ></textarea>
        </div>
      );
      break;
    default:
      inputElement = <p>Something went wrong</p>;
  }

  return inputElement;
}
