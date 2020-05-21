import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types';
import { handleCloseMenu, handleOpenMenu, resizer } from '../404/domlist';
import {
  SETAPPOINT, SETLOGIN, SETLOGOUT, DELAPPOINT,
} from '../../actions/index';
import logo from '../../imgs/logo.png';
import Error from '../404/error-page';
import styles from './appoint.module.css';
import style from '../doc/docs.module.css';


const mapStateToProps = state => ({
  appoints: state.appoints,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  setAppoints: apps => dispatch(SETAPPOINT(apps)),
  delAppoints: app => dispatch(DELAPPOINT(app)),
  setAuth: stat => dispatch(SETLOGIN(stat)),
  setLogout: act => dispatch(SETLOGOUT(act)),
});


const Appointments = ({
  auth, setAuth, setLogout, appoints, setAppoints, delAppoints,
}) => {
  const [err, setErr] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState({ load: false, message: '', type: '' });

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

  const handleRemoveApp = e => {
    const appId = e.target.dataset.id;
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
      } else {
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
  };

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
      })
      .catch(() => {
      });
  }, [setAppoints, setAuth]);

  useEffect(() => {
    if (auth.user) {
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
          resizer()
        })
        .catch(() => {
          setIsLoaded(true);
          setErr(true);
        });
    } else if (!auth.user && localStorage.tok) {
      runLocalstore(setAuth);
    } else {
      history.push('/');
    }

    return setIsLoaded(false);
  }, [auth.user, runLocalstore, setAuth, setAppoints, history]);


  if (err) {
    return (
      <Error />
    );
  }
  if (!isLoaded) {
    return (
      <div className={`${styles.containerLoad} ${styles.container}`}>
        <img src="https://www.ecoloxtech.com/images/giphycolor.gif" alt="" />
        <h3 data-testid="check-appointment-route">Appointments</h3>
      </div>
    );
  }
  return (
    <div className={`${style.container} ${styles.container}`}>
      <div className={`${style.sideBar} ${styles.sideBar} sideBar`}>
        <h3 data-testid="check-appointment-route">Appointments</h3>
        <div tabIndex="0" role="button" onKeyDown={() => { }} onClick={handleCloseMenu} className={`${styles.closeWrap} ${styles.menuWrap}`}>
          <img src="https://img.icons8.com/color/30/000000/close-window.png" className={styles.closeMenu} alt="" />
        </div>
        <p className={styles.user}>
          <img src="https://img.icons8.com/windows/35/000000/user-male-circle.png" alt="" />
          {' '}
          {auth.user && auth.user.substring(0, 7)}
        </p>
        <Link to="/">
          <img className={style.logo} src={logo} alt="" />
        </Link>
        <div className={`${style.midBar} ${styles.midBar}`}>
          <p>
            {' '}
            <Link to="/doctors">CAREGIVERS</Link>
          </p>
          <p>
            {' '}
            <Link to="/appointments">APPOINTMENTS</Link>
          </p>
        </div>

        <footer className={style.sideFoot}>
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

      <div className={styles.mainBar}>
        <div role="button" tabIndex="0" onKeyDown={() => { }} className={styles.menuWrap} onClick={handleOpenMenu}>
          <img src="https://img.icons8.com/android/24/000000/hamburger.png" alt="" className={styles.menuIcon} />
        </div>
        <h3>Appointments</h3>
        {appoints.length <= 0 ? (
          <p className={styles.noApp}>
            {' '}
            No appointments yet. Not to worry
            <Link to="/doctors">Browse </Link>
            {' '}
            through our list of caregivers and make an appointment.
          </p>
        ) : null}
        <div className={styles.appBar}>
          <table className={styles.table}>
            <tbody className={styles.tableBody}>
              {appoints.map(app => (
                <tr className={styles.tableRow} key={app.id}>
                  <td className={styles.tableData}>
                    {' '}
                    <img src="https://img.icons8.com/doodle/30/000000/doctor-male.png" alt="" />
                    {app.doctor_name || ''}
                    {' '}
                  </td>
                  <td className={styles.tableData}>
                    <img src="https://img.icons8.com/plasticine/30/000000/time.png" alt="" />
                    {app.date || ''}
                  </td>
                  <td className={styles.tableData}>
                    {app.location}
                  </td>
                  <td className={styles.tableData}>
                    <button type="button" data-id={app.id} className={styles.delButton} onClick={handleRemoveApp}>Cancel Appointment</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {alert.type === 'success'
            ? (
              <SweetAlert
                success
                title={alert.message}
                onConfirm={handleConfirmed}
                onCancel={handleCancel}
                timeout={2000}
              />
            )
            : null}
          {alert.type === 'error' ? (
            <SweetAlert
              error
              title={alert.message}
              onConfirm={handleConfirmed}
              onCancel={handleCancel}
              timeout={3500}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

Appointments.defaultProps = {
  auth: PropTypes.shape({
    isLogged: false,
    user: '',
  }),
};

Appointments.propTypes = {
  auth: PropTypes.shape({
    isLogged: PropTypes.bool,
    user: PropTypes.string,
  }),
  setAuth: PropTypes.func.isRequired,
  setLogout: PropTypes.func.isRequired,
  appoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAppoints: PropTypes.func.isRequired,
  delAppoints: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
