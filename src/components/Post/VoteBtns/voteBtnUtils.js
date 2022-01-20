import axios from '../../../shared/axiosInstances/posts';

export const voteBtnUtils = {
  addLike: async function (postId) {
    await axios.patch(`/${postId}/like/add`);
  },
  removeLike: async function (postId) {
    await axios.patch(`/${postId}/like/remove`);
  },
  addDislike: async function (postId) {
    await axios.patch(`/${postId}/dislike/add`);
  },
  removeDislike: async function (postId) {
    await axios.patch(`/${postId}/dislike/remove`);
  },
};
