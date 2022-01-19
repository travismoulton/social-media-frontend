import { customRender, screen } from '../../shared/testUtils';
import PostInput from './PostInput';

describe('<PostInput />', () => {
  test('renders', () => {
    customRender(<PostInput />);

    expect(screen.getByPlaceholderText('Say something...')).toBeInTheDocument();
  });
});
