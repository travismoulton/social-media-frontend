export const mockThread = {
  _id: 'mockThread',
  author: 'mockUser1',
  initialPost: 'mockPost1',
  title: 'mockThread',
};

const mockAuthor1 = {
  _id: 'mockUser1',
  name: 'mockUser1',
};

const mockAuthor2 = {
  _id: 'mockUser2',
  name: 'mockUser2',
};

const mockReplyLevel2 = {
  _id: 'mockReplyLevel2',
  author: mockAuthor1,
  content: 'mock reply 2 content',
  createdAt: Date.now(),
  dislikeCount: 2,
  likeCount: 0,
  likeScore: -2,
  isInitialPost: true,
  numAggregateReplies: 2,
  usersLiked: [],
  usersDisliked: [mockAuthor1, mockAuthor2],
  replies: [],
  thread: 'mockThread',
};

const mockReplyLevel1 = {
  _id: 'mockReplyLevel1',
  author: mockAuthor1,
  content: 'mock reply 1 content',
  createdAt: Date.now(),
  dislikeCount: 0,
  likeCount: 2,
  likeScore: 2,
  isInitialPost: true,
  numAggregateReplies: 2,
  usersLiked: [mockAuthor1, mockAuthor2],
  usersDisliked: [],
  replies: [mockReplyLevel2],
  thread: 'mockThread',
};

export const mockInitialPost = {
  _id: 'mockPost1',
  author: mockAuthor1,
  content: 'mock post 1 content',
  createdAt: Date.now(),
  dislikeCount: 1,
  likeCount: 1,
  likeScore: 0,
  isInitialPost: true,
  numAggregateReplies: 2,
  usersLiked: ['mockUser1'],
  usersDisliked: ['mockUser2'],
  replies: [mockReplyLevel1],
  thread: 'mockThread',
};
