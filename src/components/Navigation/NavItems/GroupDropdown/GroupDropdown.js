import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { utils } from './groupDropdownUtils';

const { getUserGroups } = utils;

export default function GroupDropdown() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) getUserGroups();
  });

  return <Link to="/">GroupDropdown</Link>;
}
