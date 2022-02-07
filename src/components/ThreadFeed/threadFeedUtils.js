import threadsInstance from '../../shared/axiosInstances/threads';
import axios from 'axios';

export const threadFeedUtils = {
  fetchAllThreadsPaginated: async function (limit, sortBy) {
    const { data } = await threadsInstance.get(
      `?page=1&limit=${limit}&sort=${sortBy}`
    );

    return data;
  },

  fetchThreadsByGroupPaginated: async function (limit, sortBy, groupId) {
    const { data } = await threadsInstance.get(
      `/byGroup/${groupId}/?page=1&limit=${limit}&sort=${sortBy}`
    );

    return data;
  },

  fetchNextPage: async function (nextUrl) {
    const { data } = await axios.get(nextUrl);

    return data;
  },
};
