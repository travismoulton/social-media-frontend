import axios from '../../shared/axiosInstances/users';

export const registerUtils = {
  register: async function (userData) {
    const data = await axios.post('signup', userData);
    return data;
  },
};
