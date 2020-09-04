import trigger from 'store/reducers/triggerSingin';

describe('Docs Reducer', () => {
  it('should return the initial state', () => {
    expect(trigger(undefined, {})).toEqual({ show: false });
  });

  it('should handle trigger show signin form', () => {
    expect(
      trigger([], {
        type: 'TRIGGER SIGNIN',
        trigger: {
          show: true,
        },
      }),
    ).toEqual({
      show: true,
    });
  });

  it('should handle trigger hide signin form', () => {
    expect(
      trigger([], {
        type: 'TRIGGER SIGNIN',
        trigger: {
          show: false,
        },
      }),
    ).toEqual({
      show: false,
    });
  });
});
