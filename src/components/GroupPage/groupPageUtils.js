import axios from '../../shared/axiosInstances/groups';

export const groupPageUtils = {
  fetchGroup: async function (groupId) {
    const { data } = await axios.get(`/${groupId}`);

    return data;
  },
};
