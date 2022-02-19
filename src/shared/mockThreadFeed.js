export const mockThreads = [
  {
    title: 'mockThread1',
    likeScore: '1',
    numComments: '1',
    group: { _id: 'groupOne', name: 'groupOne' },
    initialPost: {
      author: { name: 'Travis' },
      createdAt: new Date(2022, 2, 13),
      content: 'first mock post',
      _id: 'initialPostOne',
      usersLiked: [],
      usersDisliked: [],
    },
  },
  {
    title: 'mockThread2',
    likeScore: '2',
    numComments: '2',
    group: { _id: 'groupTwo', name: 'groupTwo' },
    initialPost: {
      author: { name: 'Kelley' },
      createdAt: new Date(2022, 2, 14),
      content: 'second mock post',
      _id: 'initialPostTwo',
      usersLiked: [],
      usersDisliked: [],
    },
  },
  {
    title: 'mockThread3',
    likeScore: '3',
    numComments: '3',
    group: { _id: 'groupThree', name: 'groupThree' },
    initialPost: {
      author: { name: 'Joe' },
      createdAt: new Date(2022, 2, 15),
      content: 'third mock post',
      _id: 'initialPostThree',
      usersLiked: [],
      usersDisliked: [],
    },
  },
];
