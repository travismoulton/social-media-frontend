import { customRender, createSpy, screen } from '../../shared/testUtils';
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
});
