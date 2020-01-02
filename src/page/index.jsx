/**
 * title: index.js
 *
 * date:12/30/2019
 *
 * author: javier olaya
 *
 * description: component that will hold all the ui layout.
 * main page component create the 404 page and the all other,
 * pages as exported components
 */
import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
// eslint-disable-next-line import/no-named-as-default
import WeatherApp from '../components/WeatherApp';

export const Whoops404 = () => (
  <div className="whoops404">
    <h1>
      resources not found at
      {/* // eslint-disable-next-line no-restricted-globals */}
      {location.pathname}
    </h1>
  </div>
);

const PageTemplate = props => {
  const { children, comp } = props;
  return (
    <div className="page">
      <WeatherApp comp={comp}>{children}</WeatherApp>
    </div>
  );
};

export const Today = () => (
  <PageTemplate comp="Today">
    <MainMenu />
  </PageTemplate>
);

export const SevenDays = () => (
  <PageTemplate comp="SevenDays">
    <MainMenu />
  </PageTemplate>
);

PageTemplate.propTypes = {
  comp: PropTypes.string,
  children: PropTypes.node
};
PageTemplate.defaultProps = {
  comp: null,
  children: null
};
