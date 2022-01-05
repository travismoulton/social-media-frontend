import axios from '../../shared/axiosInstances/users';

export const registerUtils = {
  register: async function (userData) {
    const data = await axios
      .post('signup', userData)
      .catch((err) => err.response);

    // If the api call is successful, it returns the user, and if not
    // it returns the error from the api
    return data;
  },
};
