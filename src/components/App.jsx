/**
 * title: App.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: this component handles the basic routing for the webpage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
// import WeatherApp from './WeatherApp';
import { Whoops404, Today, SevenDays } from '../page';

// eslint-disable-next-line no-unused-vars
import pages from '../css/index.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Today} />
      <Route path="/SevenDays" component={SevenDays} />
      <Route component={Whoops404} />
    </Switch>
  </Router>
);

App.PropType = {
  myComponent: PropTypes.elementType
};

export default App;
