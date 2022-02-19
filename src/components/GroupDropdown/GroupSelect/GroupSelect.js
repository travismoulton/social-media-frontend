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

  return (
    <Select
      formatOptionLabel={formatOptionLabel}
      className={classes.GroupSelect}
      onChange={changed}
      options={options}
      value={options.find((option) => option.value === value)}
      defaultValue={defaultValue}
      aria-label="Select"
    />
  );
}
