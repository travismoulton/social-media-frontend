import threadsInstance from '../../shared/axiosInstances/threads';
import axios from 'axios';

export const threadFeedUtils = {
  fetchAllThreadsPaginated: async function (sortBy) {
    const { data } = await threadsInstance.get(
      `?page=1&limit=8&sort=${sortBy}`
    );

    return data;
  },

  fetchThreadsByGroupPaginated: async function (sortBy, groupId) {
    const { data } = await threadsInstance.get(
      `/byGroup/${groupId}/?page=1&limit=8&sort=${sortBy}`
    );

    return data;
  },

  fetchNextPage: async function (nextUrl) {
    const { data } = await axios.get(nextUrl);

    return data;
  },
};
