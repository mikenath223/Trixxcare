import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import rootReducer from 'store/index';

const store = createStore(rootReducer);
export const withReduxRendering = component => (
  render(
    <Provider store={store}>
      {component}
    </Provider>,
  ));

const withReduxRouter = component => (
  withReduxRendering(
    <MemoryRouter>
      {component}
    </MemoryRouter>, document.createElement('div'),
  ));

export default withReduxRouter;
