import { customRender, screen, fireEvent } from '../../../shared/testUtils';
import PostDate from './PostDate';

describe('<PostDate />', () => {
  test('returns just now if the post was less than 1 minute ago', () => {
    const postTimeStamp = Date.now();

    customRender(<PostDate postTimeStamp={postTimeStamp} />);

    expect(screen.getByText('Just now')).toBeInTheDocument();
  });

  test('returns how many minutes ago if the post is less than an hour old', () => {
    const threeMinutes = 1000 * 180;
    const postTimeStamp = new Date(Date.now() - threeMinutes);

    customRender(<PostDate postTimeStamp={postTimeStamp} />);

    expect(screen.getByText('3 minutes ago')).toBeInTheDocument();
  });

  test('returns how many hours ago if less than a day old', () => {
    const fiveHours = 1000 * 60 * 60 * 5;
    const postTimeStamp = new Date(Date.now() - fiveHours);

    customRender(<PostDate postTimeStamp={postTimeStamp} />);

    expect(screen.getByText('5 hrs ago')).toBeInTheDocument();
  });

  test('returns how many days ago if less than a month old', () => {
    const fourteenDays = 1000 * 60 * 60 * 24 * 14;
    const postTimeStamp = new Date(Date.now() - fourteenDays);

    customRender(<PostDate postTimeStamp={postTimeStamp} />);

    expect(screen.getByText('14 days ago')).toBeInTheDocument();
  });

  test('retruns how many months ago if more than 31 days old', () => {
    const fourMonths = 1000 * 60 * 60 * 24 * 31 * 4;
    const postTimeStamp = new Date(Date.now() - fourMonths);

    customRender(<PostDate postTimeStamp={postTimeStamp} />);

    expect(screen.getByText('4 months ago')).toBeInTheDocument();
  });

  test('renders correct time to tooltip', () => {
    const postTimeStamp = new Date('December 17, 1995 03:24:00');

    customRender(<PostDate postTimeStamp={postTimeStamp} />);

    fireEvent.mouseOver(screen.getByTestId('PostDate'));

    expect(screen.getByText('Sun Dec 17, 1995 at 3:24 AM')).toBeInTheDocument();
  });
});
