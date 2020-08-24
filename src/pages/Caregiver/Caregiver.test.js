import React from 'react';
import withReduxRouter from '../../utils/testUtils';
import Caregiver from './index';


describe('Caregiver page', function () {
  beforeEach(() => {
    this.props = {
      match: {
        params: {
          doc: 'Matt%20P.%20Abel,%20M.D.-2',
        },
      },
    };
  });

  it('should match snapshot', () => {
    const { container } = withReduxRouter(
      <Caregiver {...this.props} />,
    );

    expect(container).toMatchSnapshot();
  });
});
