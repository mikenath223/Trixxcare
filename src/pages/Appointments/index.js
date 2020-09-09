import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types';
import { handleOpenMenu, resizer } from 'utils/domlist';
import { getAppointments, deleteAppoints } from 'utils/request';
import {
  SETAPPOINT, SETLOGOUT, DELAPPOINT,
} from 'store/actions';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';
import Error from 'pages/Error';
import styles from './Appointments.module.css';


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

  const history = useHistory();

  const handleLogout = () => {
    setLogout();
    localStorage.removeItem('tok');
    history.push('/');
  };

  const handleActions = () => {
    setAlert({ load: false, message: '' });
  };

  const handleRemoveApp = e => {
    const appId = e.target.dataset.id;
    deleteAppoints(appId, setAlert, delAppoints);
  };

  useEffect(() => {
    if (appoints.length > 0) {
      return setIsLoaded(true);
    }
    if (localStorage.tok) {
      getAppointments(storeAppoints, setIsLoaded, setErr);
      resizer();
    }

    return () => {
      setIsLoaded(false);
    };
  }, [appoints.length, auth.user, storeAppoints]);


  if (err) {
    return (
      <Error />
    );
  }
  if (!isLoaded) {
    return (
      <div className='container'>
        <img src="https://www.ecoloxtech.com/images/giphycolor.gif" alt="" />
        <h3 data-testid="check-appointment-route">Appointments</h3>
      </div>
    );
  }

  const logged = localStorage.tok;

  return (
    <div className='container main-container'>
      <SideBar
        auth={auth}
        logged={logged}
      >
        <Footer
          handleLogout={handleLogout}
          logged={logged}
          handleConfirmed={handleActions}
        />
      </SideBar>

      <div className={styles.mainBar}>
        <div role="button" onKeyDown={() => { }} className={`${styles.menuWrap} btn`} onClick={handleOpenMenu}>
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
                onConfirm={handleActions}
                onCancel={handleActions}
                timeout={2000}
              />
            )
            : null}
          {alert.type === 'error' ? (
            <SweetAlert
              error
              title={alert.message}
              onConfirm={handleActions}
              onCancel={handleActions}
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
