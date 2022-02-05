import Select from 'react-select';

import classes from './GroupSelect.module.css';
import GroupOptionNavBar from '../GroupOptionNavBar/GroupOptionNavBar';
import GroupOptionCreateThread from '../GroupOptionCreateThread/GroupOptionCreateThread';

export default function GroupSelect(props) {
  const { changed, options, isSearchable, fromNavBar, preLoadedGroup } = props;

  const formatOptionLabel = ({ value, label }) =>
    fromNavBar ? (
      <GroupOptionNavBar value={value} label={label} />
    ) : (
      <GroupOptionCreateThread value={value} label={label} />
    );

  const defaultValue = options.find(
    (option) => option.value === preLoadedGroup
  );

  return (
    <Select
      formatOptionLabel={formatOptionLabel}
      className={classes.GroupSelect}
      onChange={changed}
      options={options}
      isSearchable={isSearchable}
      defaultValue={defaultValue}
    />
  );
}
