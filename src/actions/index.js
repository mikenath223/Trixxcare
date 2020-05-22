const SETLOGIN = auth => ({
  type: 'SET LOGIN',
  auth,
});

const SETLOGOUT = auth => ({
  type: 'SET LOGOUT',
  auth,
});

const SETSIGNIN = trigger => ({
  type: 'TRIGGER SIGNIN',
  trigger,
});

const SETDOCTORS = docs => ({
  type: 'SET DOCS',
  docs,
});

const SETDOC = doc => ({
  type: 'SET DOC',
  doc,
});

const SETAPPOINT = appoint => ({
  type: 'SET APPOINT',
  appoint,
});

const DELAPPOINT = appoint => ({
  type: 'DEL APPOINT',
  appoint,
});

export {
  SETLOGIN, SETLOGOUT, SETSIGNIN, SETDOCTORS, SETDOC, SETAPPOINT, DELAPPOINT,
};
