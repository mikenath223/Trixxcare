/* 
/ Util function to get user token
*/
export const getToken = (username, password, trigger,
  setAuth, setAlert, setLoad) => {
  fetch('https://trixxcare.herokuapp.com/api/v1/user_token', params({
    auth: {
      username, password,
    },
  }))
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

const params = (paramsBody) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(paramsBody),
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
  trigger, setAlert, setLoad, setSigninCred, setAuth) => {
  fetch('https://trixxcare.herokuapp.com/api/v1/users', params({
    username, password,
  }))
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
        getToken(username, password, trigger,
          setAuth, setAlert, setLoad);
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
  fetch('https://trixxcare.herokuapp.com/api/v1/currentuser', {
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
  fetch('https://trixxcare.herokuapp.com/api/v1/doctors', {
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
/ Util function to get all current user appointments
*/
export const getAppointments = (setAppoints, setIsLoaded, setErr) => {
  fetch('https://trixxcare.herokuapp.com/api/v1/appointments', {
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
/ Util function to set appointments
*/
export const setAppointment = (token, date, id, ret, setAlert,
  alert, setShowpay, showPay, setDate) => {
  fetch('https://trixxcare.herokuapp.com/api/v1/appointments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
    body: JSON.stringify({
      date,
      doctor_id: id,
      location: ret.location,
      doctor_name: ret.name,
    }),
  }).then(res => {
    if (res.status !== 204) {
      res.json().then(rep => {
        setAlert({
          ...alert,
          message: rep.message,
          load: true,
          type: 'error',
        });
      });
    }
    else {
      setAlert({
        ...alert,
        message: 'Appointment created!',
        load: true,
        type: 'success',
      });
      setShowpay({
        ...showPay,
        payBtn: true,
      });
    }
    setDate('');
  }).catch(e => {
    setAlert({
      ...alert,
      message: e.message,
      load: true,
      type: 'error',
    });
  });
}

/* 
/ Util function to delete appointments
*/
export const deleteAppoints = (appId, setAlert, delAppoints) => {
  fetch(`https://trixxcare.herokuapp.com/api/v1/appointments/${appId}`, {
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

/* 
/ Util function to get single caregiver
*/
export const getCaregiver = (id, setRet, setIsLoaded, setErr) => {
  fetch(`https://trixxcare.herokuapp.com/api/v1/doctors/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.tok)}`,
    },
  }).then(res => res.json())
    .then(res => {
      setRet(res);
      setIsLoaded(true);
    })
    .catch(() => {
      setIsLoaded(true);
      setErr(true);
    });
}