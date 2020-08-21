import { SETDOCTORS, SETDOC } from '../../actions/index';


describe('doctor creation', () => {
  it('should create an action to add doctors', () => {
    const docs = [{
      doc_name: 'John Doe',
      date: '12/11/2020 01:22',
    },
    {
      doc_name: 'Jane Doe',
      date: '22/07/2020 01:22',
    },
    ];
    const expectedAction = {
      type: 'SET DOCS',
      docs,
    };
    expect(SETDOCTORS(docs)).toEqual(expectedAction);
  });

  it('should create an action to add a single doctor', () => {
    const doc = {
      doc_name: 'John Doe',
      date: '12/11/2020 01:22',
    };
    const expectedAction = {
      type: 'SET DOC',
      doc,
    };
    expect(SETDOC(doc)).toEqual(expectedAction);
  });
});
