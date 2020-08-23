import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Error.module.css';

const Error = () => (
  <div>
    <nav className={styles.navbar}>
      <Link to="/">
        <h2 className={styles.homeLink}>
          trixxcare
        </h2>
      </Link>
    </nav>
    <div className={styles.containers}>
      <img className={styles.image} src="https://blog.thomasnet.com/hs-fs/hubfs/shutterstock_774749455.jpg?width=900&name=shutterstock_774749455.jpg" alt=".." />
      <h1 data-testid="check-sor-route" className={styles.h1}>404 sor</h1>
      <Link to="/" className={styles.homeBut}><button className={styles.button} type="button">Go Home</button></Link>
    </div>
  </div>
);

export default Error;
