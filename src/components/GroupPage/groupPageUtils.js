import axios from '../../shared/axiosInstances/groups';

export const groupPageUtils = {
  fetchGroup: async function (groupId) {
    const { data } = await axios
      .get(`/${groupId}`)
      .catch((err) => console.log(err));

    return data;
  },
};
