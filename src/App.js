import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { SETLOGIN, SETSIGNIN } from 'store/actions';
import { getCurrentUser } from 'utils/request';
import PropTypes from 'prop-types';
import HomePage from 'pages/Landing';
import DocPage from 'pages/Dashboard';
import SingleDoc from 'pages/Caregiver';
import Appointments from 'pages/Appointments';
import Error from 'pages/Error';

const mapDispatchToProps = dispatch => ({
  setAuth: stat => dispatch(SETLOGIN(stat)),
  triggerShowSignin: stat => dispatch(SETSIGNIN(stat)),
});

const App = ({ setAuth, triggerShowSignin }) => {
  const [isNotAuth, setIsNotAuth] = useState(false);

  const token = localStorage.getItem('tok');
  const currentPath = window.location.pathname;
  const authPathRegex = /(\/doctors\/)|(\/appointments)/i;
  const notAuth = !token && authPathRegex.test(currentPath);

  useEffect(() => {
    if (notAuth) {
      triggerShowSignin({ show: true });
      setIsNotAuth(true);
    }
  }, [notAuth, triggerShowSignin, currentPath]);

  useEffect(() => {
    if (token) {
      getCurrentUser(setAuth);
    }
  }, [setAuth, token]);

  const renderRedirect = () => {
    if (isNotAuth) {
      return <Redirect to="/" />;
    }
    return null;
  };

  return (
    <BrowserRouter>
      {renderRedirect()}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/doctors" exact component={DocPage} />
        <Route path="/doctors/:doc" component={SingleDoc} />
        <Route path="/appointments" component={Appointments} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  setAuth: PropTypes.func.isRequired,
  triggerShowSignin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
