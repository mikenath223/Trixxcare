import { SETLOGIN, SETLOGOUT, SETSIGNIN } from 'store/actions/index';


describe('appointment creation', () => {
  it('should create an action to login a user', () => {
    const auth = {
      isLogged: true,
      user: 'Mike',
    };
    const expectedAction = {
      type: 'SET LOGIN',
      auth,
    };
    expect(SETLOGIN(auth)).toEqual(expectedAction);
  });

  it('should create an action to logout a user', () => {
    const auth = {
      isLogged: false,
      user: 'Mike',
    };
    const expectedAction = {
      type: 'SET LOGOUT',
      auth,
    };
    expect(SETLOGOUT(auth)).toEqual(expectedAction);
  });

  it('should create an action to trigger show signin form', () => {
    const trigger = {
      show: true,
    };
    const expectedAction = {
      type: 'TRIGGER SIGNIN',
      trigger,
    };
    expect(SETSIGNIN(trigger)).toEqual(expectedAction);
  });

  it('should create an action to not trigger show signin form', () => {
    const trigger = {
      show: false,
    };
    const expectedAction = {
      type: 'TRIGGER SIGNIN',
      trigger,
    };
    expect(SETSIGNIN(trigger)).toEqual(expectedAction);
  });
});
