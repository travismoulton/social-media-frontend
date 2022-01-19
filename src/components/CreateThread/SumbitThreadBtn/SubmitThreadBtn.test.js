import {
  customRender,
  screen,
  waitFor,
  fireEvent,
  createSpy,
} from '../../../shared/testUtils';
import SubmitThreadBtn from './SubmitThreadBtn';
import { submitThreadBtnUtils as utils } from './submitThreadBtnUtils';

jest.mock('./submitThreadBtnUtils');

describe('<SubmitThreadBtn />', () => {
  function setup() {
    const props = {
      groupId: 'groupId',
      postContent: 'post content',
      title: 'title',
    };

    customRender(<SubmitThreadBtn {...props} />);
  }

  let mockSubmitThread;

  beforeEach(() => {
    mockSubmitThread = createSpy(utils, 'createThread', Promise.resolve({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockSubmitThread = null;
  });

  test('makes api call when clicked if title and postContent are present', async () => {
    setup();
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockSubmitThread).toBeCalledWith(
        'groupId',
        'title',
        'post content'
      )
    );
  });
});
