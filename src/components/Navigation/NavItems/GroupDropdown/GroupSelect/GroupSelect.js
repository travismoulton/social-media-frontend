import Select from 'react-select';

import classes from './GroupSelect.module.css';
import GroupOption from '../GroupOption/GroupOption';

export default function GroupSelect(props) {
  const { changed, options, selectId, isSearchable } = props;

  const formatOptionLabel = ({ value, label }) => (
    <GroupOption value={value} label={label} />
  );

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'space-between',
      textAlign: 'left',
      height: '2.5rem',
      backgroundColor: state.isSelected
        ? '#00bbff'
        : state.isFocused
        ? '#99e6ff'
        : '#fff',

      color: (state.isFocused || state.isSelected) && '#fff',
      fontWeight: (state.isFocused || state.isSelected) && '700',
    }),
    control: (provided, state) => ({
      ...provided,
      ':hover': {
        ...provided['hover'],
        boorderColor: '#00bbff',
      },
    }),
  };

  return (
    <Select
      formatOptionLabel={formatOptionLabel}
      className={classes.GroupSelect}
      onChange={changed}
      options={options}
      // styles={customStyles}
      isSearchable={isSearchable}
    />
  );
}
