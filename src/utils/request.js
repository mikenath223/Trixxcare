/* 
/ Util function to get user token
*/
export const getToken = (username, password, trigger,
  setAuth, setAlert, setLoad) => {
  fetch('https://trixxcare.herokuapp.com/api/user_token', params(username, password))
    .then(res => {
      if (res.status === 201) {
        res.json().then(token =>
          saveToken(token, username, setAuth, trigger));
      } else {
        setAlert(prevState => ({
          ...prevState,
          message: 'Username or password is incorrect!',
          load: true,
        }));
      }
      setLoad(false);
    });
};

const params = (username, password) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    auth: {
      username, password,
    },
  }),
})
const saveToken = (token, username, setAuth, trigger) => {
  localStorage.setItem('tok', JSON.stringify(token.jwt));
  setAuth({ user: username, isLogged: true });
  hideForms()
  trigger({ show: false });
}
const hideForms = () => {
  const modals = document.querySelectorAll('.modal');
  const forms = document.querySelectorAll('.form');
  forms.forEach(el => {
    const elem = el;
    elem.classList.remove('translate');
    return '';
  });
  modals.forEach(el => {
    const elem = el;
    elem.style.visibility = 'hidden';
    return '';
  });
}


/* 
/ Util function to register new user
*/
export const registerUser = (username, password,
  trigger, setAlert, setLoad, setSigninCred) => {
  fetch('https://trixxcare.herokuapp.com/api/users', params(username, password))
    .then(res => {
      if (res.status !== 204) {
        res.json().then(rep => {
          setAlert(prevState => ({
            ...prevState,
            message: rep.message,
            load: true,
            type: 'error',
          }));
          setLoad(false);
        });
      } else {
        getToken(username, password, trigger);
        setSigninCred({ username: '', password: '' })
      }
    })
    .catch(() => {
      setAlert(prevState => ({
        ...prevState,
        message: 'Unexpected error!',
        load: true,
        type: 'error',
      }));
      setLoad(false);
    });
}

/* 
/ Util function to get current user
*/
export const getCurrentUser = (setAuth, setAlert) => {
  fetch('https://trixxcare.herokuapp.com/api/currentuser', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.tok)}`,
    },
  }).then(res => res.json())
    .then(usr => {
      setAuth({ isLogged: true, user: usr.user });
    })
    .catch(() => {
      setAlert(prevState => ({
        ...prevState,
        message: 'Unexpected error!',
        load: true,
      }));
    });
}

/* 
/ Util function to get caregivers
*/
export const getCaregivers = (setDocs, setIsLoaded, setErr, setText) => {
  fetch('https://trixxcare.herokuapp.com/api/doctors', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .then(res => {
      setDocs(res);
      setIsLoaded(true);
      setText();
    })
    .catch(() => {
      setIsLoaded(true);
      setErr(true);
    });
}

/* 
/ Util function to get user appointments
*/
export const getAppointments = (setAppoints, setIsLoaded, setErr) => {
  fetch('https://trixxcare.herokuapp.com/api/appointments', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.tok)}`,
    },
  }).then(res => res.json())
    .then(res => {
      setAppoints(res);
      setIsLoaded(true);
    })
    .catch(() => {
      setIsLoaded(true);
      setErr(true);
    });
}

/* 
/ Util function to get user and appointments
*/
export const getUserAppoints = (setAuth, setAppoints, setIsLoaded, setErr, history, getAppointments) => {
  fetch('https://trixxcare.herokuapp.com/api/currentuser', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.tok)}`,
    },
  }).then(res => res.json())
    .then(usr => {
      setAuth({ isLogged: true, user: usr.user });
      getAppointments(setAppoints, setIsLoaded, setErr);
    })
    .catch(() => {
      history.push('/');
    });
}

/* 
/ Util function to delete appointments
*/
export const deleteAppoints = (appId, setAlert, delAppoints) => {
  fetch(`https://trixxcare.herokuapp.com/api/appointments/${appId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.tok)}`,
    },
  }).then(res => {
    if (res.status !== 204) {
      res.json().then(rep => {
        setAlert(prevState => ({
          ...prevState,
          message: rep.message,
          load: true,
          type: 'error',
        }));
      });
    }
    else {
      delAppoints(appId);
      setAlert(prevState => ({
        ...prevState,
        message: 'Appointment deleted!',
        load: true,
        type: 'success',
      }));
    }
  }).catch(e => {
    setAlert(prevState => ({
      ...prevState,
      message: e.message,
      load: true,
      type: 'error',
    }));
  });
}