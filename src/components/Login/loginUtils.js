import axios from '../../shared/axiosInstances/users';

export const loginUtils = {
  login: async function (email, password) {
    await axios
      .post(`login`, { email, password })
      .then(({ data }) => console.log(data));
  },
};
