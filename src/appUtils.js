import axios from './shared/axiosInstances/users';

export const appUtils = {
  checkForUser: async function () {
    const { data } = await axios.get('checkForUser');

    if (data) return data.data;

    return null;
  },
};
