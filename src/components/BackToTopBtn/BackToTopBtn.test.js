import BackToTopBtn from './BackToTopBtn';
import { customRender, screen } from '../../shared/testUtils';

describe('<BackToTopBtn />', () => {
  test('does not render if user is at the top of the document', () => {
    customRender(<BackToTopBtn />);

    expect(screen.queryByText('Back to top')).not.toBeInTheDocument();
  });

  // Can't test scroll functionality with jest / JSDom
});
