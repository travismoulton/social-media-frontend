export const mockThreads = [
  {
    title: 'mockThread1',
    likeScore: '1',
    numComments: '1',
    group: { _id: 'groupOne' },
    initialPost: {
      author: { name: 'Travis' },
      createdAt: new Date(2022, 2, 13),
      content: 'first mock post',
      _id: 'initialPostOne',
    },
  },
  {
    title: 'mockThread2',
    likeScore: '2',
    numComments: '2',
    group: { _id: 'groupTwo' },
    initialPost: {
      author: { name: 'Kelley' },
      createdAt: new Date(2022, 2, 14),
      content: 'second mock post',
      _id: 'initialPostTwo',
    },
  },
  {
    title: 'mockThread3',
    likeScore: '3',
    numComments: '3',
    group: { _id: 'groupThree' },
    initialPost: {
      author: { name: 'Joe' },
      createdAt: new Date(2022, 2, 15),
      content: 'third mock post',
      _id: 'initialPostThree',
    },
  },
];
