import axios from '../../shared/axiosInstances/threads';

export const pageFeedUtils = {
  fetchThreads: async function (pageNumber, limit) {
    // {{url}}/threads?limit=1&page=3&sort=-likeScore

    const { data } = await axios.get(
      `?limit=${limit}&page=${pageNumber}&sort=-likeScore`
    );

    return data;
  },
};
