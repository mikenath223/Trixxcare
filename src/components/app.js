import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../containers/homePage';
import DocPage from '../containers/doc/docPage';
import SingleDoc from '../containers/docProfile/singleDoc';
import Appointments from '../containers/appointment/appointment';
import Error from '../containers/404/error-page';


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
