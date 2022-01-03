import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { customRender, screen } from '../../shared/testUtils';
import Layout from './Layout';

describe('<Layout />', () => {
  test('renders', () => {
    customRender(
      <Router history={createMemoryHistory()}>
        <Layout />
      </Router>
    );

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
