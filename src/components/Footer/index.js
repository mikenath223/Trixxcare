import React from 'react';
import style from './Footer.module.css';

const Footer = ({ handleLogout, logged, handleConfirmed }) => (
  <footer className={style.sideFoot}>
    {logged ? <button type="button" href="#" onClick={handleLogout} tabIndex="3">Logout</button> : 
    <button type="button" href="#" onClick={handleConfirmed} tabIndex="4">Sign In</button>}
    <p>
      {' '}
      <a href="https://github.com/mikenath223/trixxcare/issues" target="_blank" rel="noopener noreferrer" tabIndex="5">Help</a>
    </p>
    <p>
      <img src="https://img.icons8.com/android/24/000000/twitter.png" alt="" />
      <img src="https://img.icons8.com/android/24/000000/facebook-new.png" alt="" />
      <img src="https://img.icons8.com/android/24/000000/google-plus.png" alt="" />
      <img src="https://img.icons8.com/material/24/000000/vimeo.png" alt="" />
      <img src="https://img.icons8.com/metro/24/000000/pinterest.png" alt="" />
    </p>
  </footer>
)

export default Footer;