import axios from '../../shared/axiosInstances/users';

export const loginUtils = {
  login: async function (email, password) {
    const { data } = await axios.post(`login`, { email, password });
    return data;
  },
};
