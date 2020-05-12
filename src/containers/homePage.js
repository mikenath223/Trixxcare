import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SETLOGIN } from '../actions/index';


// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODkyOTkxMjYsInN1YiI6MX0.nEmWU4froh_OXf6r4Tq4oa8OaMnfPPR2phlbc4JqSEU"

const mapDispatchToProps = dispatch => ({
  setAuth: stat => dispatch(SETLOGIN(stat)),
})

const mapStateToProps = state => ({
  auth: state.auth,
})

const HomePage = ({ setAuth, auth }) => {
  const [signinCred, setSigninCred] = useState({ username: '', pass: '' });
  const [registerCred, setRegisterCred] = useState({ username: '', pass: '', confirmPass: '' });
  const [notLogged, setnotLogged] = useState(false)

  const showRegister = () => {
    const form = document.querySelector('.reg-form');
    const signModal = document.querySelector('.reg-modal')
    showRegisterForm()
    signModal.style.visibility = 'visible';
    form.classList.add('translate');
  };

  const showSignin = () => {
    const form = document.querySelector('.signin-form');
    const regModal = document.querySelector('.signin-modal')
    showRegisterForm()
    showSigninForm()
    regModal.style.visibility = 'visible';
    form.classList.add('translate');
  };

  const showRegisterForm = () => {
    const form = document.querySelector('.reg-form');
    const regModal = document.querySelector('.reg-modal')

    document.querySelector('.close-reg').onclick = () => {
      regModal.style.visibility = 'hidden';
      form.classList.remove('translate');
    };
    window.onclick = e => {
      const modals = document.querySelectorAll('.modal');
      const forms = document.querySelectorAll('.form');
      modals.forEach(el => {
        if (e.target === el) {
          el.style.visibility = 'hidden';
          forms.forEach(fr => fr.classList.remove('translate'))
        }
      })
    };
  };

  const showSigninForm = () => {
    const form = document.querySelector('.signin-form');
    const signModal = document.querySelector('.signin-modal')

    document.querySelector('.close-sign').onclick = () => {
      signModal.style.visibility = 'hidden';
      form.classList.remove('translate');
    };
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();

    fetch('https://trixxcare.herokuapp.com/api/users', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": registerCred.username,
        "password": registerCred.pass
      })
    })
      .then(tok => {
        if (tok.message) {
          return console.log(tok.message)
        }
        console.log(tok)
        setAuth({ user: registerCred.username });
        getTok();
      })
      .catch(error => console.log(error))
  }


  const getTok = () => {
    console.log('runs')
    const username = registerCred.username;
    const pass = registerCred.pass;

    fetch('https://trixxcare.herokuapp.com/api/user_token', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth: {
          username: username,
          password: pass
        }
      })
    })
      .then(res => res.json())
      .then(tok => {
        localStorage.setItem('tok', JSON.stringify(tok.jwt))
        setAuth({ isLogged: true })
        console.log(auth);
      })
      .catch(error => console.log(error))
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
  }
  const handleRegChange = e => {
    const val = e.target.value;
    switch (e.target.name) {
      case ('username'):
        setRegisterCred(prevState => {
          return { ...prevState, username: val }
        })
        break;
      case ('password'):
        setRegisterCred(prevState => {
          return { ...prevState, pass: val }
        })
        break;
      default:
        setRegisterCred(prevState => {
          return { ...prevState, confirmPass: val }
        })
        if (registerCred.pass !== val) {
          e.target.setCustomValidity("Password values must match!");
        } else {
          e.target.setCustomValidity("");
        }
        break;
    }
  }


  useEffect(() => {

    if (localStorage.tok) {
      fetch('https://trixxcare.herokuapp.com/api/currentuser', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${JSON.parse(localStorage.tok).jwt}`,
        }
      }).then(res => res.json())
        .then(usr => {
          console.log('runs')
          usr = usr.user;
          setAuth({ isLogged: true, user: usr });
          setnotLogged(true);
        })
        .catch(error => console.log(error))

    }

  }, [setAuth])


  return (
    <div>
      {
        !notLogged ?
          <div>
            <button className="signin-but" onClick={showSignin}>SIGN IN</button>
            <button className="reg-but" onClick={showRegister}>REGISTER</button>
          </div>
          : null
      }
      <div>
        <Link to="/doctors"> Browse</Link> through our wide array of medical professionals always at your service.
      </div>
      <div className="reg-modal modal">
        <span className="close close-reg">&times;</span>
        <form className="reg-form form" onSubmit={handleRegSubmit}>
          <h1>Register</h1>
          <label htmlFor="username">
            Username <br />
            <input type="text" name="username" onChange={handleRegChange} required />
          </label>

          <label htmlFor="password">
            Password <br />
            <input type="password" name="password" minLength='6' onChange={handleRegChange} required />
          </label>
          <label htmlFor="password-confirmation">
            Confirm Password <br />
            <input type="password" name="password-conf" minLength='6' onChange={handleRegChange} required />
          </label>
          <input type="submit" value="Register" />
        </form>
      </div>

      <div className="signin-modal modal">
        <span className="close close-sign">&times;</span>
        <form className="signin-form form" onSubmit={handleSigninSubmit}>
          <h1>Sign In</h1>
          <label htmlFor="username">
            Username
          <input type="text" name="username" required />
          </label>

          <label htmlFor="password">
            Password
          <input type="password" name="password" required />
          </label>
          <input type="submit" value="Sign In" />
        </form>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);