import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types';
import { handleCloseMenu, handleOpenMenu, resizer } from '../../utils/domlist';
import { getAppointments, deleteAppoints } from 'utils/request';
import {
  SETAPPOINT, SETLOGOUT, DELAPPOINT,
} from 'store/actions';
import logo from 'assets/images/logo.png';
import Error from 'pages/Error';
import styles from './Appointments.module.css';
import style from 'pages/Dashboard/Dashboard.module.css';


const mapStateToProps = state => ({
  appoints: state.appoints,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  storeAppoints: apps => dispatch(SETAPPOINT(apps)),
  delAppoints: app => dispatch(DELAPPOINT(app)),
  setLogout: act => dispatch(SETLOGOUT(act)),
});


const Appointments = ({
  auth, setLogout, appoints, storeAppoints, delAppoints,
}) => {
  const [err, setErr] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState({ load: false, message: '', type: '' });

  const history = useHistory()
  
  const handleLogout = () => {
    setLogout();
    localStorage.removeItem('tok');
    history.push('/')
  };

  const handleCancel = () => {
    setAlert({ load: false, message: '' });
  };

  const handleConfirmed = () => {
    setAlert({ load: false, message: '' });
  };

  const handleRemoveApp = e => {
    const appId = e.target.dataset.id;
    deleteAppoints(appId, setAlert, delAppoints);
  };

  useEffect(() => {
    if (localStorage.tok) {
      getAppointments(storeAppoints, setIsLoaded, setErr);
      resizer();
    }

    return setIsLoaded(false);
  }, [auth.user, storeAppoints]);


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
  setLogout: PropTypes.func.isRequired,
  appoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  storeAppoints: PropTypes.func.isRequired,
  delAppoints: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);