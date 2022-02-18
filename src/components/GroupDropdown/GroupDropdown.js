import { useState, useEffect, useCallback } from 'react';

import GroupSelect from './GroupSelect/GroupSelect';
import { utils } from './groupDropdownUtils';

const { fetchAllGroups } = utils;

export default function GroupDropdown(props) {
  const {
    fromNavBar,
    fromCreateThread,
    updateGroupStateAndUrl,
    preLoadedGroup,
    groupName,
  } = props;

  const [dropdown, setDropdown] = useState({
    elementType: 'select',
    elementConfig: {
      options: [],
    },
    // If rendered from inside groupDetail page, there will be a preLoadedGroup
    // Otherwise their will not.
    value: preLoadedGroup || 0,
  });

  const [groupsAsOptions, setGroupsAsOptions] = useState(null);

  useEffect(() => {
    (async () => {
      const groups = await fetchAllGroups();
      console.log(groups);

      if (groups)
        setGroupsAsOptions(
          groups.map((group) => ({
            value: group._id,
            label: group.name,
            group,
          }))
        );
    })();
  }, []);

  const setDropdownOptions = useCallback(() => {
    setDropdown({
      ...dropdown,
      elementConfig: {
        ...dropdown.elementConfig,
        options: [...groupsAsOptions],
      },
    });
  }, [dropdown, groupsAsOptions]);

  useEffect(() => {
    // Only update the drop down options if there is a logged in user, groups have been fetched
    const shouldUpdateDropdownOptions =
      groupsAsOptions &&
      // The length of the select menu options should be one more than the length of groups,
      // as there is a blank option. This prevents it from being updated more than once
      dropdown.elementConfig.options.length !== groupsAsOptions.length;

    if (shouldUpdateDropdownOptions) setDropdownOptions();
  }, [groupsAsOptions, setDropdownOptions, dropdown, preLoadedGroup]);

  function changed(val, group) {
    setDropdown({ ...dropdown, value: val });

    // When rendered in CreateThread, it should change the groupState when a new group is selected
    if (fromCreateThread) updateGroupStateAndUrl(group);
  }

  return (
    <GroupSelect
      options={dropdown.elementConfig.options}
      changed={(e) => changed(e.value, e.group)}
      fromNavBar={fromNavBar}
      value={dropdown.value}
      // If rendered from GroupDetail page, this component will be passed preLoadedGroup
      // and groupName props. If passed these props, use them to set a default value
      // on the select
      defaultValue={groupName && { value: preLoadedGroup, label: groupName }}
    />
  );
}
