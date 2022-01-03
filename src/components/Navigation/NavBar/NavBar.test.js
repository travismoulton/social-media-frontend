import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { customRender, screen } from '../../../shared/testUtils';
import NavBar from './NavBar';

describe('<NavBar />', () => {
  test('renders', () => {
    customRender(
      <Router history={createMemoryHistory()}>
        <NavBar />
      </Router>
    );
    expect(screen.getByTestId('Nav')).toBeInTheDocument();
  });
});
