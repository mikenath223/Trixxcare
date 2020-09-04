import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import withReduxRouter from 'utils/testUtils';
import Error from 'pages/Error';
import App from 'App';


test('landing page rendering or navigation', () => {
  const { getByTestId } = withReduxRouter(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByTestId('check-home-route').textContent).toBe('Landing Page');
});

test('making a bad 404 route request', () => {
  const { getByTestId } = withReduxRouter(
    <MemoryRouter>
      <Error />
    </MemoryRouter>,
  );

  expect(getByTestId('check-error-route').textContent).toBe('404 Error');
});
