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
import WheatherApp from './WheatherApp';

// eslint-disable-next-line no-unused-vars
import pages from '../css/index.scss';

const App = () => (
  <div>
    {' '}
    cool story bro
    <WheatherApp />
  </div>
);

App.PropType = {
  myComponent: PropTypes.elementType
};

export default App;
