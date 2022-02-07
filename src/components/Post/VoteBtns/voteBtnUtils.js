import axios from '../../../shared/axiosInstances/posts';

export const voteBtnUtils = {
  addLike: async function (postId) {
    const { data } = await axios.patch(`/${postId}/like/add`);
    return data;
  },
  removeLike: async function (postId) {
    const { data } = await axios.patch(`/${postId}/like/remove`);
    return data;
  },
  addDislike: async function (postId) {
    const { data } = await axios.patch(`/${postId}/dislike/add`);
    return data;
  },
  removeDislike: async function (postId) {
    const { data } = await axios.patch(`/${postId}/dislike/remove`);
    return data;
  },
};
