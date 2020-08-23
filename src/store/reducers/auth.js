const auth = (state = {}, action) => {
  switch (action.type) {
    case 'SET LOGIN':
      return {
        ...state,
        user: (action.auth).user,
        isLogged: (action.auth).isLogged,
      };
    case 'SET LOGOUT':
      return {
        ...state,
        isLogged: false,
        user: '',
      };
    default:
      return state;
  }
};

export default auth;
