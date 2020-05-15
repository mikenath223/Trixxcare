const appoints = (state = [], action) => {
  switch (action.type) {
    case 'SET APPOINT':
      return action.appoint
    case 'DEL APPOINT':
      return [
        ...state
      ].filter(ap => +ap.id !== +action.appoint)
    default:
      return state;
  }
  
};

export default appoints;