import React from 'react';
import withReduxRouter from '../../utils/testUtils';
import DocPage from '../../containers/doc/docPage';


describe('DocPage', function () {
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
    const { container } = withReduxRouter(<DocPage {...this.props} />);

    expect(container).toMatchSnapshot();
  });
});
