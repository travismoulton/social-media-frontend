import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import classes from './MembershipBtn.module.css';
import { membershipBtnUtils } from './membershipBtnUtils';
import {
  removeUserMembership,
  addGroupMembership,
} from '../../../../store/authSlice';

const { deleteMembership, createMembership } = membershipBtnUtils;

export default function MembershipBtn({ group }) {
  const [isMember, setIsMember] = useState(undefined);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMember(user.groupMemberships.includes(group._id));
  }, [user, group]);

  async function submitHandler() {
    if (isMember) {
      await deleteMembership(group._id);
      dispatch(removeUserMembership(group._id));
    }
    if (!isMember) {
      await createMembership(group._id);
      dispatch(addGroupMembership(group._id));
    }
  }

  return (
    <button className={`Global-btn-2 ${classes.Btn}`} onClick={submitHandler}>
      {isMember ? 'Leave Group' : 'Join Group'}
    </button>
  );
}
