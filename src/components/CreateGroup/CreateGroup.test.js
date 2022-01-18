import {
  customRender,
  createSpy,
  screen,
  fireEvent,
} from '../../shared/testUtils';
import CreateGroup from './CreateGroup';
import { createGroupUtils as utils } from './createGroupUtils';

jest.mock('./createGroupUtils');

describe('<CreateGroup />', () => {
  let mockCreateGroup;

  beforeEach(() => {
    mockCreateGroup = createSpy(utils, 'createGroup', Promise.resolve({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockCreateGroup = null;
  });

  function setup() {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modalContainer');
    document.body.appendChild(portalRoot);

    const props = { show: true, closeModal: jest.fn() };

    customRender(<CreateGroup {...props} />);
  }

  test('renders', () => {
    setup();

    expect(screen.getByText('Create Group')).toBeInTheDocument();
  });

  test('displays error message if there GroupName input is left empty', () => {
    setup();
    const btn = screen.getByText('Create Group');

    fireEvent.click(btn);

    expect(screen.getByText('Group name is required')).toBeInTheDocument();
    expect(mockCreateGroup).not.toBeCalled();
  });

  test('send api request when form is filled out correctly', () => {
    setup();
    const btn = screen.getByText('Create Group');

    const nameInput = screen.getByLabelText('Group Name');
    fireEvent.change(nameInput, { target: { value: 'fake name' } });

    const descriptionInput = screen.getByTestId('groupDescription');
    fireEvent.change(descriptionInput, {
      target: { value: 'fake description' },
    });

    fireEvent.click(btn);
    expect(mockCreateGroup).toBeCalledWith(
      expect.objectContaining({
        description: 'fake description',
        name: 'fake name',
      })
    );
  });
});
