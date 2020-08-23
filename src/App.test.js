import React from 'react';
import App from './App';
import { withReduxRendering } from 'utils/testUtils';

describe('App', () => {
  it('should match snapshot', () => {
    const { container } = withReduxRendering(<App />);

    expect(container).toMatchSnapshot();
  });
});
