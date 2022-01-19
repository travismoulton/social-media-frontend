import axios from '../../shared/axiosInstances/posts';

export const threadUtils = {
  getIntialPost: async function (postId) {
    const { data } = await axios.get(`/${postId}`);

    return data;
  },
};
