import singleDoc from '../../reducers/singleDoc';


describe('Single Doctor Reducer', () => {
  it('should return the initial state', () => {
    expect(singleDoc(undefined, {})).toEqual({});
  });

  it('should handle getting the doctor', () => {
    expect(
      singleDoc({}, {
        type: 'SET DOC',
        doc: {
          id: 1,
          doc_name: 'John Doe',
          Areasoffocus: 'Cancer, Pediatric Medicine',
        },
      }),
    ).toEqual({
      id: 1,
      doc_name: 'John Doe',
      Areasoffocus: 'Cancer, Pediatric Medicine',
    });
  });
});
