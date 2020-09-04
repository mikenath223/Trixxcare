import React from 'react';
import { Link } from 'react-router-dom';
import { handleCloseMenu } from 'utils/domlist';
import PropTypes from 'prop-types';
import Logo from 'assets/images/logo.png';
import style from './SideBar.module.css';

const SideBar = ({ auth, children, logged }) => (
  <div className={`${style.sideBar} sideBar`}>
    <button onClick={handleCloseMenu} type="button" onKeyDown={() => { }} className={`${style.closeWrap} ${style.menuWrap}`}>
      <img src="https://img.icons8.com/color/30/000000/close-window.png" className={style.closeMenu} alt="" />
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
      <p>
        <Link to="/doctors" tabIndex="-1">CAREGIVER</Link>
      </p>
      {logged ? (
        <p>
          {' '}
          <Link to="/appointments" tabIndex="-2">APPOINTMENTS</Link>
        </p>
      ) : null}
    </div>
    {children}
  </div>
);

SideBar.propTypes = {
  auth: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  logged: PropTypes.string.isRequired,
};

export default SideBar;
