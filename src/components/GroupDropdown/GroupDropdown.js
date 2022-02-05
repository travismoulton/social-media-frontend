import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import GroupSelect from './GroupSelect/GroupSelect';
import { utils } from './groupDropdownUtils';

const { fetchAllGroups } = utils;

export default function GroupDropdown(props) {
  const {
    fromNavBar,
    fromCreateThread,
    updateGroupStateAndUrl,
    preLoadedGroup,
  } = props;

  const [dropdown, setDropdown] = useState({
    elementType: 'select',
    elementConfig: {
      options: [],
    },
    value: 0,
    isSearchable: false,
  });

  const [loaded, setLoaded] = useState(false);
  const [groupsAsOptions, setGroupsAsOptions] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const groups = await fetchAllGroups();

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

    setLoaded(true);
  }, [dropdown, groupsAsOptions]);

  useEffect(() => {
    // Only update the drop down options if there is a logged in user, groups have been fetched
    const shouldUpdateDropdownOptions =
      user &&
      groupsAsOptions &&
      // The length of the select menu options should be one more than the length of groups,
      // as there is a blank option. This prevents it from being updated more than once
      dropdown.elementConfig.options.length !== groupsAsOptions.length;

    if (shouldUpdateDropdownOptions) setDropdownOptions();
  }, [user, groupsAsOptions, setDropdownOptions, dropdown]);

  function changed(val, group) {
    setDropdown({ ...dropdown, value: val });

    // When rendered in CreateThread, it should change the groupState when a new group is selected
    if (fromCreateThread) updateGroupStateAndUrl(group);
  }

  return (
    loaded && (
      <GroupSelect
        options={dropdown.elementConfig.options}
        isSearchable={false}
        changed={(e) => changed(e.value, e.group)}
        fromNavBar={fromNavBar}
        preLoadedGroup={preLoadedGroup}
      />
    )
  );
}
