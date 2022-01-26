import {
  customRender,
  screen,
  waitFor,
  fireEvent,
  createSpy,
} from '../../../shared/testUtils';
import { mockInitialPost } from '../../../shared/mockThread';

import VoteBtns from './VoteBtns';
import { voteBtnUtils as utils } from './voteBtnUtils';

jest.mock('./voteBtnUtils');

describe('<VoteBtns />', () => {
  let mockAddLike, mockAddDislike, mockRemoveLike, mockRemoveDislike;

  beforeEach(() => {
    const returnVal = Promise.resolve({});

    mockAddLike = createSpy(utils, 'addLike', returnVal);
    mockAddDislike = createSpy(utils, 'addDislike', returnVal);
    mockRemoveDislike = createSpy(utils, 'removeDislike', returnVal);
    mockRemoveLike = createSpy(utils, 'removeLike', returnVal);
  });

  afterEach(() => {
    jest.clearAllMocks();

    mockAddLike = null;
    mockAddDislike = null;
    mockRemoveDislike = null;
    mockRemoveLike = null;
  });
});
