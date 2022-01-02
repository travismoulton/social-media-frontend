import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import authReducer from '../store/authSlice';

function customRender(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper, ...renderOptions });
}

export const createSpy = (obj, methodName, returnVal) =>
  jest.spyOn(obj, methodName).mockImplementation(jest.fn(() => returnVal));

export * from '@testing-library/react';

export { customRender };
