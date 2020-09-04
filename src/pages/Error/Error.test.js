import React from 'react';
import withReduxRouter from 'utils/testUtils';
import Error from './index';


describe('404 page', () => {
  it('should match snapshot', () => {
    const { container } = withReduxRouter(<Error />);

    expect(container).toMatchSnapshot();
  });
});
