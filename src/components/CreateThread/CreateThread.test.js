/* eslint-disable testing-library/no-wait-for-side-effects */
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import {
  customRender,
  screen,
  fireEvent,
  waitFor,
  createSpy,
} from '../../shared/testUtils';
import CreateThread from './CreateThread';
import { utils } from '../GroupDropdown/groupDropdownUtils';
import { submitThreadBtnUtils as btnUtils } from './SumbitThreadBtn/submitThreadBtnUtils';

jest.mock('../GroupDropdown/groupDropdownUtils');
jest.mock('./SumbitThreadBtn/submitThreadBtnUtils');

const mockGroups = [
  { _id: 'groupOne', name: 'groupOne' },
  { _id: 'groupTwo', name: 'groupTwo' },
  { _id: 'groupThree', name: 'groupThree' },
  { _id: 'groupFour', name: 'groupFour' },
];
describe('<CreateThread />', () => {
  let mockSubmit;
  beforeEach(() => {
    createSpy(utils, 'fetchAllGroups', Promise.resolve(mockGroups));

    mockSubmit = createSpy(
      btnUtils,
      'createThread',
      Promise.resolve({ data: { title: 'thread' } })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockSubmit = null;
  });

  function openSelectMenu(select) {
    fireEvent.focus(select);
    fireEvent.keyDown(select, { keyCode: 40 });
  }

  function setup(withGroup) {
    const history = createMemoryHistory();
    if (withGroup) history.location.state = { group: mockGroups[0] };

    customRender(
      <Router history={history}>
        <CreateThread />
      </Router>
    );

    return history;
  }

  test('renders', async () => {
    await waitFor(() => setup());

    expect(screen.getByText('Create Thread')).toBeInTheDocument();
  });

  test('If the user uses the group dropdown to change groups, the url updates', async () => {
    const history = await waitFor(() => setup(true));

    const dropdown = screen.getByLabelText('Select');
    openSelectMenu(dropdown);

    fireEvent.click(screen.getByText('groupThree'));

    expect(history.location.pathname).toEqual('/group/groupThree/createThread');
  });

  test('If there is no title, the submit button is disabled', async () => {
    await waitFor(() => setup(true));

    const textarea = screen.getByPlaceholderText('Say something...');

    fireEvent.change(textarea, { target: { value: 'post content' } });

    expect(textarea).toHaveValue('post content');

    expect(screen.getByText('Create Thread')).toHaveAttribute('disabled');
  });

  test('If there is no group the submit button is disabled', async () => {
    await waitFor(() => setup());

    const textarea = screen.getByPlaceholderText('Say something...');
    const titleInput = screen.getByPlaceholderText('Thread title...');

    fireEvent.change(textarea, { target: { value: 'post content' } });
    fireEvent.change(titleInput, { target: { value: 'fake title' } });

    expect(textarea).toHaveValue('post content');
    expect(titleInput).toHaveValue('fake title');

    expect(screen.getByText('Create Thread')).toHaveAttribute('disabled');
  });

  test('If there is no post content, the submit button is disabled', async () => {
    await waitFor(() => setup(true));

    const titleInput = screen.getByPlaceholderText('Thread title...');

    fireEvent.change(titleInput, { target: { value: 'fake title' } });

    expect(titleInput).toHaveValue('fake title');

    expect(screen.getByText('Create Thread')).toHaveAttribute('disabled');
  });

  test('If there is a group, a title, and post content, createThread is called when the submit button is clicked', async () => {
    await waitFor(() => setup(true));

    const textarea = screen.getByPlaceholderText('Say something...');
    const titleInput = screen.getByPlaceholderText('Thread title...');

    fireEvent.change(textarea, { target: { value: 'post content' } });
    fireEvent.change(titleInput, { target: { value: 'fake title' } });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockSubmit).toBeCalledWith(
        'groupOne',
        'fake title',
        'post content'
      )
    );
  });
});
