const trigger = (state = { show: false }, action) => {
  switch (action.type) {
    case 'TRIGGER SIGNIN':
      return {
        ...state,
        show: (action.trigger).show,
      };
    default:
      return state;
  }
};

export default trigger;
