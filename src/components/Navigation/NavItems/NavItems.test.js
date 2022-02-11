import { MemoryRouter } from 'react-router-dom';
import { customRender, screen } from '../../../shared/testUtils';

import NavItems from './NavItems';

describe('<NavItems />', () => {
  function setup(isAuthenticated) {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modalContainer');
    document.body.appendChild(portalRoot);

    customRender(
      <MemoryRouter>
        <NavItems isAuthenticated={isAuthenticated} />
      </MemoryRouter>
    );
  }

  test('renders', () => {
    setup(false);

    expect(screen.getByTestId('NavItems')).toBeInTheDocument();
  });

  test('renders with 4 children if user is logged in', () => {
    setup(true);

    expect(screen.getByTestId('NavItems').childNodes).toHaveLength(4);
  });

  test('renders with 2 children if no user', () => {
    setup(false);

    expect(screen.getByTestId('NavItems').childNodes).toHaveLength(3);
  });
});
