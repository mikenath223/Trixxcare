import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index';
import App from '../../components/app';

const store = createStore(rootReducer);
const reduxRendering = component => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

test('it renders the home component', () => {
  reduxRendering(<App />);
});
