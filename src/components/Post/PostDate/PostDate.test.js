import { customRender, screen } from '../../../shared/testUtils';
import PostDate from './PostDate';

describe('<PostDate />', () => {
  test('returns just now if the post was less than 1 minute ago', () => {
    const postTimeStamp = Date.now();

    customRender(<PostDate postTimeStamp={postTimeStamp} />);

    expect(screen.getByText('Just now')).toBeInTheDocument();
  });
});
