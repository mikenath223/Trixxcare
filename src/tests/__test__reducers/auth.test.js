import auth from 'store/reducers/auth';


describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({});
  });

  it('should handle logging in a user', () => {
    expect(
      auth([], {
        type: 'SET LOGIN',
        auth: {
          isLogged: true,
          user: 'Mike',
        },
      }),
    ).toEqual(
      {
        isLogged: true,
        user: 'Mike',
      },
    );
  });

  it('should handle logging out a user', () => {
    expect(
      auth({
        isLogged: true,
        user: 'Mike',
      }, {
        type: 'SET LOGOUT',
        auth: {
          isLogged: false,
          user: 'Mike',
        },
      }),
    ).toEqual(
      {
        isLogged: false,
        user: '',
      },
    );
  });
});


// const auth = (state = {}, action) => {
//   switch (action.type) {
//     case 'SET LOGIN':
//       return {
//         ...state,
//         user: (action.auth).user,
//         isLogged: (action.auth).isLogged,
//       };
//     case 'SET LOGOUT':
//       return {
//         ...state,
//         isLogged: false,
//         user: '',
//       };
//     default:
//       return state;
//   }
// };

// export default auth;
