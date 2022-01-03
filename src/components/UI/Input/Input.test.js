import { useState } from 'react';

import { customRender, fireEvent, screen } from '../../../shared/testUtils';
import Input from './Input';

function MockComponent() {
  const [mockInput, setMockInput] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'mockPlaceholder',
    },
    value: '',
    id: 'mockInput',
  });

  const changed = (e) => setMockInput({ ...mockInput, value: e.target.value });

  return (
    <Input
      elementType={mockInput.elementType}
      elementConfig={mockInput.elementConfig}
      changed={(e) => changed(e)}
      value={mockInput.value}
      id={mockInput.id}
    />
  );
}

describe('<Input />', () => {
  test('renders a text input and updates the value on user input', () => {
    customRender(<MockComponent />);

    const input = screen.getByTestId('mockInput');
    expect(input).toBeInTheDocument();

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'someOtherVal' } });

    expect(input.value).toBe('someOtherVal');
  });
});
