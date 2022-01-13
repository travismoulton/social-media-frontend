import axios from '../../shared/axiosInstances/groups';

export const createGroupUtils = {
  createGroup: async function (groupName) {
    const { data } = await axios
      .post('/', { name: groupName })
      .catch((err) => err.response);

    return data;
  },
};
