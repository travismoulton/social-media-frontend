import axios from '../../shared/axiosInstances/groups';

export const createGroupUtils = {
  createGroup: async function (groupData) {
    const { data } = await axios
      .post('/', groupData)
      .catch((err) => err.response);

    return data;
  },
};
