import axios from '../../../../shared/axiosInstances/memberships';
import groupsInstance from '../../../../shared/axiosInstances/groups';

export const utils = {
  fetchUserGroups: async function () {
    const { data } = await axios.get('/userGroups');

    return data.data;
  },
  fetchAllGroups: async function () {
    const { data } = await groupsInstance.get('/');

    return data.data;
  },
};
