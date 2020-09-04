import React from 'react';
import { withReduxRendering } from 'utils/testUtils';
import App from './App';

describe('App', () => {
  it('should match snapshot', () => {
    const { container } = withReduxRendering(<App />);

    expect(container).toMatchSnapshot();
  });
});
