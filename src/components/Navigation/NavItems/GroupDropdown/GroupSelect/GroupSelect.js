import Select from 'react-select';

import classes from './GroupSelect.module.css';
import GroupOptionWithLink from '../GroupOptionWithLink/GroupOptionWithLink';
import GroupOptionNoLink from '../GroupOptionNoLink/GroupOptionNoLink';

export default function GroupSelect(props) {
  const { changed, options, isSearchable, withLink, preLoadedGroup } = props;

  const formatOptionLabel = ({ value, label }) =>
    withLink ? (
      <GroupOptionWithLink value={value} label={label} />
    ) : (
      <GroupOptionNoLink value={value} label={label} />
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
