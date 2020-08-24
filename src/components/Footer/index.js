import React from 'react';
import style from './Footer.module.css';

const Footer = ({ handleLogout, Ondashboard, children }) => (
  <footer className={style.sideFoot}>
    {Ondashboard ? children : <button type="button" onClick={handleLogout}>Logout</button>}
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
)

export default Footer;