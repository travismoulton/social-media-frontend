import axios from '../../../../shared/axiosInstances/memberships';

export const utils = {
  fetchUserGroups: async function () {
    const { data } = await axios.get('/userGroups');

    return data.data;
  },
};
