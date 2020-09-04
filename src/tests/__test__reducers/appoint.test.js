import appoints from 'store/reducers/appoint';


describe('Appoints Reducer', () => {
  it('should return the initial state', () => {
    expect(appoints(undefined, {})).toEqual([]);
  });

  it('should handle getting appointments', () => {
    expect(
      appoints([], {
        type: 'SET APPOINT',
        appoint: [{
          doc_name: 'John Doe',
          date: '12/11/2020 01:22',
        }],
      }),
    ).toEqual([
      {
        doc_name: 'John Doe',
        date: '12/11/2020 01:22',
      },
    ]);
  });

  it('should handle deleting appointments', () => {
    expect(
      appoints([{
        id: 1,
        doc_name: 'Jane Doe',
        date: '1/01/2020 11:22',
      },
      {
        id: 2,
        doc_name: 'John Doe',
        date: '12/11/2020 01:22',
      }], {
        type: 'DEL APPOINT',
        appoint: 1,
      }),
    ).toEqual([
      {
        id: 2,
        doc_name: 'John Doe',
        date: '12/11/2020 01:22',
      },
    ]);
  });
});
