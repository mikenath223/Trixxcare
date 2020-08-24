import React from 'react';
import withReduxRouter from 'utils/testUtils';
import Dashboard from './index';


describe('Dashboard page', function () {
  beforeEach(() => {
    this.props = {
      match: {
        params: {
          name: 'doctors',
        },
      },
    };
  });

  it('should match snapshot', () => {
    const { container } = withReduxRouter(<Dashboard {...this.props} />);

    expect(container).toMatchSnapshot();
  });
});
