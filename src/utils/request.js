/* 
 / Util function to get user token
*/
const tokenUrl = 'https://trixxcare.herokuapp.com/api/user_token';
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

export const getToken = (username, password, trigger,
  setAuth, setAlert, setLoad) => {
  fetch(tokenUrl, params(username, password))
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
const userUrl = 'https://trixxcare.herokuapp.com/api/users'
export const registerUser = (username, password,
  trigger, setAlert, setLoad, setSigninCred) => {
  fetch(userUrl, params(username, password))
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
const currentUserUrl = 'https://trixxcare.herokuapp.com/api/currentuser'
export const getCurrentUser = (setAuth, setAlert) => {
  fetch(currentUserUrl, {
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