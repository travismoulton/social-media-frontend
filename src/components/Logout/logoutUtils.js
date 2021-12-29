import axios from '../../shared/axiosInstances/users';

export const logoutUtils = {
  logout: async function () {
    const { data } = await axios.get('logout');
    return data;
  },
};
