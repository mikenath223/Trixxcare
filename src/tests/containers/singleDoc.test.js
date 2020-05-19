import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import reduxRendering from '../route/route.test';
import SingleDoc from '../../containers/docProfile/singleDoc';

const match = {
  params: {
    name: 'Matt%20P.%20Abel,%20M.D.-2',
  },
};
const div = document.createElement('div');


it('renders correct component', () => {
  reduxRendering(
    <MemoryRouter>
      <SingleDoc match={match} />
    </MemoryRouter>, div,
  );
});

it('the component has the right input', () => {
  const { getByTestId } = reduxRendering(
    <MemoryRouter>
      <SingleDoc match={match} />
    </MemoryRouter>,
  );

  expect(getByTestId('check-singledoc-route')).toHaveTextContent('Single Doc');
});
