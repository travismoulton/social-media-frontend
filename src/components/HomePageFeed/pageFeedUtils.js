import axios from '../../shared/axiosInstances/threads';

export const pageFeedUtils = {
  fetchPaginatedThreads: async function (pageNumber, limit) {
    const { data } = await axios.get(
      `?limit=${limit}&page=${pageNumber}&sort=-likeScore`
    );

    return data;
  },
};
