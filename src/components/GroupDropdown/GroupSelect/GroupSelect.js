import Select from 'react-select';

import classes from './GroupSelect.module.css';
import GroupOptionNavBar from '../GroupOptionNavBar/GroupOptionNavBar';
import GroupOptionCreateThread from '../GroupOptionCreateThread/GroupOptionCreateThread';

export default function GroupSelect(props) {
  const { changed, options, fromNavBar, value, defaultValue } = props;

  const formatOptionLabel = ({ value, label }) =>
    fromNavBar ? (
      <GroupOptionNavBar value={value} label={label} />
    ) : (
      <GroupOptionCreateThread value={value} label={label} />
    );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.menuIsOpen && '0 1px 1px 1px rgba(0, 0, 0, 0.1)',
      borderColor: state.menuIsOpen ? '#999' : 'hsl(0, 0%, 80%)',

      ':hover': {
        ...provided[':hover'],
        borderColor: '#999',
        cursor: 'pointer',
      },
    }),
  };

  return (
    <Select
      formatOptionLabel={formatOptionLabel}
      className={classes.GroupSelect}
      onChange={changed}
      options={options}
      value={options.find((option) => option.value === value)}
      defaultValue={defaultValue}
      aria-label="Select"
      styles={customStyles}
      placeholder="Select a group"
    />
  );
}
