import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap-button-loader';
import style from '../styles/reg.module.css';


const Singup = ({ handleRegChange, handleRegSubmit, load }) => (
  <div className={`${style.modal} modal reg-modal `}>
    <span className={`${style.close} close close-reg`}>&times;</span>
    <form method="post" className={`${style.form} form reg-form `} onSubmit={handleRegSubmit}>
      <h1>Register</h1>
      <label htmlFor="username">
        Username
        {' '}
        <br />
        <input type="text" name="username" maxLength="10" onChange={handleRegChange} required />
      </label>

      <label htmlFor="password">
        Password
        {' '}
        <br />
        <input type="password" name="password" minLength="6" onChange={handleRegChange} required />
      </label>
      <label htmlFor="password-confirmation">
        Confirm Password
        {' '}
        <br />
        <input type="password" name="password-conf" minLength="6" onChange={handleRegChange} required />
      </label>
      <Button loading={load} className={`${style.but} but`}>Register</Button>
    </form>
  </div>
);

Singup.propTypes = {
  handleRegChange: PropTypes.func.isRequired,
  handleRegSubmit: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
};

export default Singup;
