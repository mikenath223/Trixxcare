import React from 'react';
import withReduxRouter from '../../utils/testUtils';
import SingleDoc from '../../containers/DocProfile/SingleDoc';


describe('SingleDoc', function () {
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
      <SingleDoc {...this.props} />,
    );

    expect(container).toMatchSnapshot();
  });
});
