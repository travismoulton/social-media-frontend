import threadsInstance from '../../shared/axiosInstances/threads';
import axios from 'axios';

export const threadFeedUtils = {
  fetchAllThreadsPaginated: async function (limit) {
    const { data } = await threadsInstance.get(
      `?page=1&limit=${limit}&sort=-likeScore,createdAt`
    );

    return data;
  },

  fetchThreadsByGroupPaginated: async function (limit, groupId) {
    const { data } = await threadsInstance.get(
      `/byGroup/${groupId}/?page=1&limit=${limit}&sort=-likeScore,createdAt`
    );

    return data;
  },

  fetchNextPage: async function (nextUrl) {
    const { data } = await axios.get(nextUrl);

    return data;
  },
};
