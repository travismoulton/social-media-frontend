import axios from '../../../../shared/axiosInstances/memberships';

export const membershipBtnUtils = {
  deleteMembership: async function (groupId) {
    await axios.delete(`/${groupId}`);
  },
  createMembership: async function (groupId) {
    await axios.post(`/${groupId}`);
  },
};
