import axios from '../../shared/axiosInstances/posts';

export const postUtils = {
  deletePost: async function (postId) {
    const { data } = await axios.delete(`/${postId}`);

    return data;
  },
};
