import threadsInstance from '../../../shared/axiosInstances/threads';

export const submitThreadBtnUtils = {
  createThread: async function (groupId, title, postContent) {
    const { data } = await threadsInstance
      .post('/', {
        group: groupId,
        title,
        content: postContent,
      })
      .catch((err) => console.log(err.response));
    return data;
  },
};
