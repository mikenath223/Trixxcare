import docs from '../../reducers/docs';


describe('Docs Reducer', () => {
  it('should return the initial state', () => {
    expect(docs(undefined, {})).toEqual([]);
  });

  it('should handle getting docs', () => {
    expect(
      docs([], {
        type: 'SET DOCS',
        docs: [{
          id: 1,
          doc_name: 'John Doe',
          Areasoffocus: 'Cancer, Pediatric Medicine',
        },
        {
          id: 2,
          doc_name: 'Jane Dane',
          Areasoffocus: 'Physiotherapy, Pediatric Medicine',
        }],
      }),
    ).toEqual([
      {
        id: 1,
        doc_name: 'John Doe',
        Areasoffocus: 'Cancer, Pediatric Medicine',
      },
      {
        id: 2,
        doc_name: 'Jane Dane',
        Areasoffocus: 'Physiotherapy, Pediatric Medicine',
      },
    ]);
  });
});
