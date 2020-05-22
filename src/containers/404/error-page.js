import React from 'react';
import { Link } from 'react-router-dom';
import styleErr from './error.module.css';

const Error = () => (
  <div>
    <nav className={styleErr.navbar}>
      <Link to="/">
        <h2 className={styleErr.homeLink}>
          trixxcare
        </h2>
      </Link>
    </nav>
    <div className={styleErr.containerErr}>
      <img className={styleErr.image} src="https://blog.thomasnet.com/hs-fs/hubfs/shutterstock_774749455.jpg?width=900&name=shutterstock_774749455.jpg" alt=".." />
      <h1 data-testid="check-error-route" className={styleErr.h1}>404 Error</h1>
      <Link to="/" className={styleErr.homeBut}><button className={styleErr.button} type="button">Go Home</button></Link>
    </div>
  </div>
);

export default Error;
