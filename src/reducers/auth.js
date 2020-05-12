const auth = (state = {}, action) => {
  switch (action.type) {
    case 'SET LOGIN':
      return Object.assign(state, action.auth)
    default:
      return state;
  }
};

export default auth;