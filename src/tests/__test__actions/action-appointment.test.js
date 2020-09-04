import { SETAPPOINT, DELAPPOINT } from 'store/actions/index';


describe('appointment creation', () => {
  it('should create an action to add an appointment', () => {
    const appoint = {
      doc_name: 'John Doe',
      date: '12/11/2020 01:22',
    };
    const expectedAction = {
      type: 'SET APPOINT',
      appoint,
    };
    expect(SETAPPOINT(appoint)).toEqual(expectedAction);
  });

  it('should create an action to remove an appointment', () => {
    const appoint = {
      doc_name: 'John Doe',
      date: '12/11/2020 01:22',
    };
    const expectedAction = {
      type: 'DEL APPOINT',
      appoint,
    };
    expect(DELAPPOINT(appoint)).toEqual(expectedAction);
  });
});
