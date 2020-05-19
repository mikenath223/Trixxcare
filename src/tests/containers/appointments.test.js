import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import reduxRendering from '../route/route.test';
import Appointments from '../../containers/appointment/appointment';


const match = {
  params: {
    name: 'appointments',
  },
};
const div = document.createElement('div');


it('renders correct component', () => {
  reduxRendering(
    <MemoryRouter>
      <Appointments match={match} />
    </MemoryRouter>, div,
  );
});
