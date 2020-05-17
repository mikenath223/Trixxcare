const singleDoc = (state = {}, action) => {
  switch (action.type) {
    case 'SET DOC':
      return action.doc;
    default:
      return state;
  }
};

export default singleDoc;
