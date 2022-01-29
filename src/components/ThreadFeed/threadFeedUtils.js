import axios from '../../shared/axiosInstances/threads';

export const threadFeedUtils = {
  fetchAllThreadsPaginated: async function (pageNumber, limit) {
    const { data } = await axios.get(
      `?limit=${limit}&page=${pageNumber}&sort=-likeScore`
    );

    return data;
  },

  fetchThreadsByGroupPaginated: async function (pageNumber, limit, groupId) {
    const { data } = await axios.get(
      `/byGroup/${groupId}/?limit=${limit}&page=${pageNumber}&sort=-likeScore`
    );

    return data;
  },
};
