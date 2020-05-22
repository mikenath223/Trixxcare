import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import rootReducer from '../../reducers/index';
import Error from '../../containers/404/error-page';
import App from '../../components/app';


afterEach(cleanup);
const div = document.createElement('div');
const store = createStore(rootReducer);
const reduxRendering = component => ({
  ...render(<Provider store={store}>{component}</Provider>),
});


test('landing page rendering or navigation', () => {
  const { getByTestId } = reduxRendering(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div,
  );

  expect(getByTestId('check-home-route').textContent).toBe('Landing Page');
});

test('making a bad 404 route request', () => {
  const { getByTestId } = reduxRendering(
    <MemoryRouter>
      <Error />
    </MemoryRouter>, div,
  );

  expect(getByTestId('check-error-route').textContent).toBe('404 Error');
});

export default reduxRendering;
