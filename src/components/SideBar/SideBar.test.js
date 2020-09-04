import React from 'react';
import { cleanup } from '@testing-library/react';
import { withRouter } from 'utils/testUtils';
import SideBar from './index';

describe('SideBar', function () {
  afterEach(cleanup);

  beforeEach(() => {
    this.props = {
      logged: '',
      auth: jest.fn(),
      children: '',
    };
  });

  it('should match snapshot', () => {
    const { container } = withRouter(<SideBar {...this.props} />);

    expect(container).toMatchSnapshot();
  });
});
