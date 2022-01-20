import axios from '../../../shared/axiosInstances/posts';

export const submitReplyBtnUtils = {
  submitReply: async function (content, parentPost, threadId) {
    const { data } = await axios.post('/', {
      content,
      parentPost,
      thread: threadId,
    });
  },
};
