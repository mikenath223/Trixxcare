import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './index';

describe('Footer', function () {
  afterEach(cleanup);

  beforeEach(() => {
    this.props = {
      logged: '',
      handleConfirmed: jest.fn(),
      handleLogout: jest.fn(),
    };
  });

  it('should match snapshot', () => {
    const { container } = render(<Footer {...this.props} />);

    expect(container).toMatchSnapshot();
  });
});
