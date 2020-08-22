import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import DocPage from '../containers/Doc/DocPage';
import SingleDoc from '../containers/DocProfile/SingleDoc';
import Appointments from '../containers/Appointment/Appointment';
import Error from '../containers/404/ErrorPage';


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
