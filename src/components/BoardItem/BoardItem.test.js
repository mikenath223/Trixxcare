import React from 'react';
import { withRouter } from 'utils/testUtils';
import { cleanup } from '@testing-library/react';
import BoardItem from './index';

describe('BoardItem', function () {
  afterEach(cleanup);

  beforeEach(() => {
    this.props = {
      doc: {
        image: 'image',
        id: 1,
        details: 'Orthopedic',
        name: 'John Doe',
      },
      style: {},
    };
  });

  it('should match snapshot', () => {
    const { container } = withRouter(<BoardItem {...this.props} />);

    expect(container).toMatchSnapshot();
  });

  it('should display details', () => {
    const { getByText } = withRouter(<BoardItem {...this.props} />);

    expect(getByText(/John Doe/)).toBeInTheDocument();
  });
});
