import React from 'react';
import withReduxRouter from '../../utils/testUtils';
import Appointments from '.';

describe('Appointments', function () {
  beforeEach(() => {
    this.props = {
      match: {
        params: {
          name: 'appointments',
        },
      },
    };
  });

  it('should match snapshot', () => {
    const { container } = withReduxRouter(
      <Appointments {...this.props} />,
    );

    expect(container).toMatchSnapshot();
  });
});
