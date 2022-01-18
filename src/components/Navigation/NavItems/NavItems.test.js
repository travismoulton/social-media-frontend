import { MemoryRouter } from 'react-router-dom';
import { customRender, screen } from '../../../shared/testUtils';

import NavItems from './NavItems';

describe('<NavItems />', () => {
  test('renders', () => {
    customRender(
      <MemoryRouter>
        <NavItems />
      </MemoryRouter>
    );

    expect(screen.getByTestId('NavItems')).toBeInTheDocument();
  });

  test('renders with 3 children if user is logged in', () => {
    const preloadedState = {
      auth: { user: {} },
    };

    customRender(
      <MemoryRouter>
        <NavItems />
      </MemoryRouter>,
      { preloadedState }
    );

    expect(screen.getByTestId('NavItems').childNodes).toHaveLength(3);
  });

  test('renders with 2 children if no user', () => {
    customRender(
      <MemoryRouter>
        <NavItems />
      </MemoryRouter>
    );

    expect(screen.getByTestId('NavItems').childNodes).toHaveLength(3);
  });
});
