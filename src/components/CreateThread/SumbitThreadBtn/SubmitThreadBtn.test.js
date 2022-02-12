import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

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

    const history = createMemoryHistory();

    customRender(
      <Router history={history}>
        <SubmitThreadBtn {...props} />
      </Router>
    );
  }

  let mockSubmitThread;

  beforeEach(() => {
    mockSubmitThread = createSpy(
      utils,
      'createThread',
      Promise.resolve({ data: { title: 'threadTitle' } })
    );
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
