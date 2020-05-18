import React from 'react';
import { Link } from 'react-router-dom';
import styleErr from './error.module.css';

const Error = () => (
  <div>
    <nav className="navbar fixed-top navbar-dark bg-dark">
      <Link to="/">
        <h2 className={`${styleErr.homeLink} navbar-brand`}>
          {' '}
          <span className={styleErr.yellow}>trix</span>
          Care
        </h2>
      </Link>
    </nav>
    <div className={styleErr.containerErr}>
      <img className={styleErr.image} src="https://search.muz.li/assets/images/empty-404.jpg" alt=".." />
      <h1 data-testid="check-error-route" className={styleErr.h1}>404 Error</h1>
      <Link to="/" className={styleErr.homeBut}><button className={styleErr.button} type="button">Go Home</button></Link>
    </div>
  </div>
);

export default Error;
