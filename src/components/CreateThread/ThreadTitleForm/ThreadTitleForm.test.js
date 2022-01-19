import { customRender, screen } from '../../../shared/testUtils';
import ThreadTitleForm from './ThreadTitleForm';

describe('<ThreadTitleForm />', () => {
  test('renders', () => {
    customRender(<ThreadTitleForm />);
    expect(screen.getByPlaceholderText('Thread title...')).toBeInTheDocument();
  });
});
