import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import NavItems from './NavItems';

describe('<NavItems />', () => {
  test('renders', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NavItems />
      </MemoryRouter>
    );

    expect(getByTestId('NavItems')).toBeInTheDocument();
  });
});
