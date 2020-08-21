import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import SweetAlert from 'react-bootstrap-sweetalert';
import CheckoutForm from './checkout';
import { SETLOGIN, SETLOGOUT } from '../../actions/index';
import { handleCloseMenu, handleOpenMenu, resizer } from '../404/domlist';
import Error from '../404/error-page';
import style from './singledoc.module.css';
import 'react-calendar/dist/Calendar.css';
import styles from '../doc/docs.module.css';
import logo from '../../imgs/logo.png';


const mapStateToProps = state => ({
  auth: state.auth,
  docs: state.docs,
});

const mapDispatchToProps = dispatch => ({
  setAuth: stat => dispatch(SETLOGIN(stat)),
  setLogout: act => dispatch(SETLOGOUT(act)),
});


const SingleDoc = ({
  match, docs, auth, setAuth, setLogout,
}) => {
  const [err, setErr] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ret, setRet] = useState({});
  const [date, setDate] = useState('');
  const [alert, setAlert] = useState({ load: false, message: '', type: '' });
  const [showPay, setShowpay] = useState({ payBtn: false, payForm: false });

  const history = useHistory();

  const handleLogout = () => {
    setLogout();
    localStorage.removeItem('tok');
  };


  const handleCancel = () => {
    setAlert({ load: false, message: '' });
  };

  const handleConfirmed = () => {
    setAlert({ load: false, message: '' });
  };

  const handleStripeCancel = () => {
    setShowpay(prevState => ({
      ...prevState,
      payForm: false,
    }));
  };

  const handleChange = date => {
    setDate(`${date.toLocaleDateString()} ${document.querySelector('.timeInput2').value}`);
    document.querySelector('.timeInput1').style.display = 'initial';
    document.querySelector('.timeInput2').style.display = 'initial';
  };

  const handleClick = () => {
    setAlert(prevState => ({
      ...prevState,
      load: true,
      type: 'appoint',
    }));
  };

  const handleTimeChange = e => {
    setDate(`${date.split(' ')[0]} ${e.target.value}`);
    document.querySelector('.createAppoint').disabled = false;
  };
  const id = match.params.doc.split('-')[1];


  const handleSetAppoint = () => {
    if (date.length >= 15) {
      fetch('https://trixxcare.herokuapp.com/api/appointments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.tok)}`,
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
            setAlert(prevState => ({
              ...prevState,
              message: rep.message,
              load: true,
              type: 'error',
            }));
          });
          setDate('');
        } else {
          setAlert(prevState => ({
            ...prevState,
            message: 'Appointment created!',
            load: true,
            type: 'success',
          }));
          setShowpay(prevState => ({
            ...prevState,
            payBtn: true,
          }));
          setDate('');
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
  };


  const getDoc = useCallback(
    () => {
      fetch(`https://trixxcare.herokuapp.com/api/doctors/${id}`, {
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
    }, [id],
  );


  const runLocalstore = useCallback(() => {
    fetch('https://trixxcare.herokuapp.com/api/currentuser', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.tok)}`,
      },
    }).then(res => res.json())
      .then(usr => {
        setAuth({ isLogged: true, user: usr.user });
        getDoc();
      })
      .catch(() => {
      });
  }, [setAuth, getDoc]);

  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  const handleShowPay = () => {
    setShowpay(prevState => ({
      ...prevState,
      payForm: true,
    }));
  };


  useEffect(() => {
    if (auth.user && localStorage.tok) {
      getDoc();
    } else if (localStorage.tok && !auth.user) {
      runLocalstore(setAuth);
    } else {
      history.push('/');
    }
    if (docs.length > 0) {
      const filtered = docs.filter((el, ind) => ind + 1 === +id);
      setRet(filtered[0]);
      return setIsLoaded(true);
    }
    resizer();

    return setIsLoaded(false);
  }, [auth.user, docs, id, getDoc, history, runLocalstore, setAuth]);


  if (err) {
    return (
      <Error />
    );
  }
  if (!isLoaded) {
    return (
      <div className={`${style.containerLoad} ${style.container}`}>
        <img src="https://www.ecoloxtech.com/images/giphycolor.gif" alt="" />
      </div>
    );
  }
  return (
    <div className={`${styles.container} ${style.container}`}>
      <h3 data-testid="check-home-route">Categories</h3>
      <div className={`${styles.sideBar} ${style.sideBar} sideBar`}>
        <div role="button" tabIndex="0" onClick={handleCloseMenu} onKeyDown={() => {}} className={`${style.closeWrap} ${style.menuWrap}`}>
          <img src="https://img.icons8.com/color/30/000000/close-window.png" className={style.closeMenu} alt="" />
        </div>
        <p className={styles.user}>
          <img src="https://img.icons8.com/windows/35/000000/user-male-circle.png" alt="" />
          {' '}
          { auth.user && auth.user.substring(0, 7)}
        </p>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="" />
        </Link>
        <div className={styles.midBar}>
          <p>
            {' '}
            <Link to="/doctors">CAREGIVER</Link>
          </p>
          <p>
            {' '}
            <Link to="/appointments">APPOINTMENTS</Link>
          </p>
        </div>

        <footer className={styles.sideFoot}>
          <button type="button" onClick={handleLogout}>Logout</button>
          <p>
            {' '}
            <a href="https://github.com/mikenath223/trixxcare/issues" target="_blank" rel="noopener noreferrer">Help</a>
          </p>
          <p>
            <img src="https://img.icons8.com/android/24/000000/twitter.png" alt="" />
            <img src="https://img.icons8.com/android/24/000000/facebook-new.png" alt="" />
            <img src="https://img.icons8.com/android/24/000000/google-plus.png" alt="" />
            <img src="https://img.icons8.com/material/24/000000/vimeo.png" alt="" />
            <img src="https://img.icons8.com/metro/24/000000/pinterest.png" alt="" />
          </p>
        </footer>
      </div>

      <div className={`${styles.slideWrap} ${style.slideWrap}`}>
        <div className={style.imgWrap}>
          <div className={style.menuWrap} role="button" tabIndex="0" onKeyDown={() => {}} onClick={handleOpenMenu}>
            <img src="https://img.icons8.com/android/24/000000/hamburger.png" alt="" className={style.menuIcon} />
          </div>
          <img src={ret.image} alt="doctor" />
        </div>
        <div className={style.rightBar}>
          <p>{ret.name}</p>
          <p>{ret.details.split('|')[0]}</p>
          <div className={style.dep}>
            {' '}
            <span>Department</span>
            {' '}
            <p>{ret.details.split('|')[1]}</p>
          </div>
          {ret.details.split('|')[2] ? (
            <div className={style.areas}>
              <span>Areas of Focus</span>
              {' '}
              <br />
              {ret.details.split('|')[2]}
            </div>
          )
            : null}
          <p className={style.locWrap}>
            {' '}
            <span className={style.location}>Location</span>
            {' '}
            {ret.location}
          </p>
          <p className={style.price}>
            Price $
            {ret.price}
          </p>
          { showPay.payBtn ? <button type="button" onClick={handleShowPay} className={style.pay}>Pay</button> : null }
          { showPay.payForm
            ? (
              <SweetAlert
                showCloseButton
                onCancel={handleStripeCancel}
                showConfirm={false}
                onConfirm={handleStripeCancel}
                title="Make Payment"
              >
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    SweetAlert={SweetAlert}
                    handleConfirmed={handleConfirmed}
                    handleCancel={handleCancel}
                  />
                </Elements>
              </SweetAlert>
            ) : null}
          <button type="button" onClick={handleClick} className={`${style.request} btn btn-danger btn-link`}>
            Request Appointment
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 172 172"
              style={{ fill: '#000000' }}
            >
              <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                <path d="M0,172v-172h172v172z" fill="none" />
                <g fill="#ffffff">
                  <path d="M53.32,29.24c-13.27907,0 -24.08,10.80093 -24.08,24.08v65.36c0,13.27907 10.80093,24.08 24.08,24.08h65.36c13.27907,0 24.08,-10.80093 24.08,-24.08v-65.36c0,-13.27907 -10.80093,-24.08 -24.08,-24.08zM53.32,32.68h65.36c11.42013,0 20.64,9.21987
                20.64,20.64v65.36c0,11.42013 -9.21987,20.64 -20.64,20.64h-65.36c-11.42013,0 -20.64,-9.21987 -20.64,-20.64v-65.36c0,-11.42013 9.21987,-20.64 20.64,-20.64zM57.62,37.84c-10.9138,0 -19.78,8.8662
                -19.78,19.78v56.76c0,10.9138 8.8662,19.78 19.78,19.78h56.76c10.9138,0 19.78,-8.8662 19.78,-19.78v-29.24c0.00439,-0.31015 -0.15856,-0.59863 -0.42645,-0.75498c-0.26789,-0.15635 -0.59921,-0.15635 -0.8671,0c-0.26789,0.15635 -0.43084,0.44484 -0.42645,0.75498v29.24c0,9.9842 -8.0758,18.06 -18.06,18.06h-56.76c-9.9842,0 -18.06,
                -8.0758 -18.06,-18.06v-56.76c0,-9.9842 8.0758,-18.06 18.06,-18.06h56.76c0.54574,0 1.09089,0.03381 1.64273,0.08398c0.30607,0.02765 0.60364,-0.11011 0.7806,-0.36136c0.17696,-0.25126 0.20641,-0.57784 0.07727,-0.85671c-0.12914,-0.27887 -0.39726,-0.46764 -0.70334,-0.49521c-0.58335,-0.05303 -1.18028,-0.0907 -1.79727,-0.0907zM86,
                55.04c-2.83988,0 -5.16,2.32012 -5.16,5.16v0.67188c-8.33364,2.15124 -14.64347,9.3641 -15.40273,18.17422c-0.04322,0.4917 -1.5956,17.58658 -1.72336,18.99391h-0.07391c-2.83988,0 -5.16,2.32012 -5.16,5.16c0,2.83988 2.32012,5.16 5.16,5.16h14.08922c0.81434,3.89493 4.14366,6.88 8.2775,6.88c4.13384,0 7.4598,-2.98507 8.27414,-6.88h14.07914c2.83988,0 5.16,-2.32012 5.16,-5.16c0,-2.83988 -2.32012,-5.16 -5.16,-5.16h-0.07391c-0.12776,-1.40732 -1.68015,-18.5022 -1.72336,-18.99391c-0.75926,-8.81011 -7.06909,-16.02298 -15.40273,-18.17422v-0.67187c0,-2.83988 -2.32012,-5.16 -5.16,-5.16zM86,56.76c1.91076,0 3.44,1.52924 3.44,3.44v0.30234c-1.12024,-0.18852 -2.26662,-0.30234 -3.44,-0.30234c-1.17338,0 -2.31976,0.11382 -3.44,0.30234v-0.30234c0,-1.91076 1.52924,-3.44 3.44,-3.44zM86,61.92c0.69355,0 1.37817,0.0403 2.05258,0.11758c0.04995,0.00539 0.09798,0.01774 0.14781,0.02352c0.64547,0.07917 1.2828,0.18624 1.91148,0.32586l0.03695,0.01008c7.93533,1.77626 13.98662,8.51182 14.70063,16.79688c0.05217,0.59371 1.56025,17.19745 1.70992,18.84609h-41.11875c0.14967,-1.64864 1.65775,-18.25238 1.70992,-18.84609c0.71513,-8.29809 6.7838,-15.0436 14.73758,-16.80695c0.62868,-0.13962 1.26602,-0.24669 1.91148,-0.32586c0.04983,-0.00577 0.09786,-0.01813 0.14781,-0.02352c0.67441,-0.07728 1.35902,-0.11758 2.05258,-0.11758zM133.28656,63.62656c-0.22809,0.00356 -0.44542,0.09758 -0.60418,0.26138c-0.15876,0.1638 -0.24595,0.38397 -0.24238,0.61205v3.44c-0.00439,0.31015 0.15856,0.59863 0.42645,0.75498c0.26789,0.15635 0.59921,0.15635 0.8671,0c0.26789,-0.15635 0.43084,-0.44484 0.42645,-0.75498v-3.44c0.00364,-0.23275 -0.08721,-0.45703 -0.25181,-0.62163c-0.1646,-0.1646 -0.38888,-0.25545 -0.62163,-0.25181zM133.28656,72.22656c-0.22809,0.00356 -0.44542,0.09758 -0.60418,0.26138c-0.15876,0.1638 -0.24595,0.38397 -0.24238,0.61205v6.88c-0.00439,0.31015 0.15856,0.59863 0.42645,0.75498c0.26789,0.15635 0.59921,0.15635 0.8671,0c0.26789,-0.15635 0.43084,-0.44484 0.42645,-0.75498v-6.88c0.00364,-0.23275 -0.08721,-0.45703 -0.25181,-0.62163c-0.1646,-0.1646 -0.38888,-0.25545 -0.62163,-0.25181zM63.64,99.76h44.72c1.91076,0 3.44,1.52924 3.44,3.44c0,1.91076 -1.52924,3.44 -3.44,3.44h-13.73984h-17.23023h-13.74992c-1.91076,0 -3.44,-1.52924 -3.44,-3.44c0,-1.91076 1.52924,-3.44 3.44,-3.44zM79.49625,108.36h13.02094c-0.77574,2.9458 -3.31699,5.16 -6.51047,5.16c-3.19335,0 -5.7346,-2.21439 -6.51047,-5.16z"
                  />
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>

      {
        alert.load && alert.type === 'appoint'
          ? (
            <SweetAlert
              showCloseButton
              onCancel={handleCancel}
              showConfirm={false}
              onConfirm={handleConfirmed}
              title="Create Appointment"
            >
              <Calendar
                className="calender"
                onChange={handleChange}
                minDate={new Date()}
                minDetail="decade"
              />
              <label htmlFor="time" className={`${style.time} timeInput1`}>
                Set Time
                {' '}
                <br />
                <input type="time" name="time" onInput={handleTimeChange} className={`${style.timeInput2} timeInput2`} />
              </label>
              <button type="button" className={`${style.createAppoint} createAppoint btn btn-danger btn-link`} onClick={handleSetAppoint}>Set Appointment</button>
            </SweetAlert>
          )
          : null
      }

      {
        alert.load && alert.type === 'success'
          ? (
            <SweetAlert
              success
              title="Appointment Created!"
              onConfirm={handleConfirmed}
              onCancel={handleCancel}
              timeout={2000}
            />
          ) : null
      }
      {
        alert.load && alert.type === 'error' ? (
          <SweetAlert
            error
            title={alert.message}
            onConfirm={handleConfirmed}
            onCancel={handleCancel}
            timeout={3500}
          />
        )
          : null
      }
    </div>
  );
};


SingleDoc.defaultProps = {
  auth: PropTypes.shape({
    isLogged: false,
    user: '',
  }),
};


SingleDoc.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      doc: PropTypes.string,
    }),
  }).isRequired,
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,
  auth: PropTypes.shape({
    isLogged: PropTypes.bool,
    user: PropTypes.string,
  }),
  setAuth: PropTypes.func.isRequired,
  setLogout: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SingleDoc);
