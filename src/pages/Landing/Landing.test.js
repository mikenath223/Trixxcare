import React from 'react';
import withReduxRouter from 'utils/testUtils';
import Landing from './index';


describe('Landing page', function () {

  it('should match snapshot', () => {
    const { container } = withReduxRouter(<Landing />);

    expect(container).toMatchSnapshot();
  });
});
