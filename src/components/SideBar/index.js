import React from 'react';
import { Link } from 'react-router-dom';
import { handleCloseMenu } from 'utils/domlist';
import PropTypes from 'prop-types';
import Logo from 'assets/images/logo.png';
import style from './SideBar.module.css';

const SideBar = ({ auth, children, logged, currentPage }) => {
  
  return (
    <div className={`${style.sideBar} sideBar`}>
      <button onClick={handleCloseMenu} type="button" onKeyDown={() => { }} className={`${style.closeMenu} btn`}>
        <img src="https://img.icons8.com/color/30/000000/close-window.png" alt="" />
      </button>
      <p className={style.user}>
        {auth.user && <img src="https://img.icons8.com/windows/35/000000/user-male-circle.png" alt="" />}
        {' '}
        {auth.user && auth.user.substring(0, 7)}
      </p>
      <Link to="/">
        <img className={style.logo} src={Logo} alt="" />
      </Link>
      <div className={style.midBar}>
        <p className={currentPage === 'doctors' && style.activeTab}>
          <Link to="/doctors">CAREGIVER</Link>
        </p>
        {logged ? (
          <p className={currentPage === 'appointments' && style.activeTab}>
            {' '}
            <Link to="/appointments">APPOINTMENTS</Link>
          </p>
        ) : null}
      </div>
      {children}
    </div>
  )
};

SideBar.propTypes = {
  auth: PropTypes.shape({
    isLogged: PropTypes.bool,
    user: PropTypes.string
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  logged: PropTypes.string,
};

export default SideBar;
