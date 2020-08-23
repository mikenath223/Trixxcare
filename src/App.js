import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from 'pages/Landing';
import DocPage from 'pages/Dashboard';
import SingleDoc from 'pages/Caregiver';
import Appointments from 'pages/Appointments';
import Error from 'pages/Error';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/doctors" exact component={DocPage} />
      <Route path="/doctors/:doc" component={SingleDoc} />
      <Route path="/appointments" component={Appointments} />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>
);

export default App;
