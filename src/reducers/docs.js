const docs = (state = {}, action) => {
  switch (action.type) {
    case 'SET DOCS':
      return action.docs
    default:
      return state;
  }
};

export default docs;