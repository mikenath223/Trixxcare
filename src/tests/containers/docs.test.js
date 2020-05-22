import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import reduxRendering from '../route/route.test';
import DocPage from '../../containers/doc/docPage';


const match = {
  params: {
    name: 'doctors',
  },
};
const div = document.createElement('div');


it('renders correct component', () => {
  reduxRendering(
    <MemoryRouter>
      <DocPage match={match} />
    </MemoryRouter>, div,
  );
});

it('the component has the right input', () => {
  const { getByTestId } = reduxRendering(
    <MemoryRouter>
      <DocPage match={match} />
    </MemoryRouter>,
  );

  expect(getByTestId('check-doctors-route')).toHaveTextContent('Doctors');
});
