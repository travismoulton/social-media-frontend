import axios from '../../shared/axiosInstances/posts';

export const threadUtils = {
  fetchInitialPost: async function (postId) {
    const { data } = await axios.get(`/${postId}`);

    return data;
  },
};
