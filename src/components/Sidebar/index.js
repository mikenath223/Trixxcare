import React from 'react';
import { Link } from 'react-router-dom';
import style from './Sidebar.module.css';
import Logo from 'assets/images/logo.png';
import { handleCloseMenu } from 'utils/domlist';

const Sidebar = ({ auth, children, logged }) => (
  <div className={style.sideBar + ' sideBar'}>
    <div onClick={handleCloseMenu} role="button" tabIndex="1" onKeyDown={() => { }} className={`${style.closeWrap} ${style.menuWrap}`}>
      <img src="https://img.icons8.com/color/30/000000/close-window.png" className={style.closeMenu} alt="" />
    </div>
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
        <Link to="/doctors">CAREGIVER</Link>
      </p>
      {logged ? (
        <p>
          {' '}
          <Link to="/appointments" tabIndex="2">APPOINTMENTS</Link>
        </p>
      ) : null}
    </div>
    {children}
  </div>
)

export default Sidebar;