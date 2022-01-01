import axios from '../../../../shared/axiosInstances/memberships';

export const utils = {
  getUserGroups: async function () {
    const { data } = await axios.get('/userGroups');

    return data.data;
  },
};
