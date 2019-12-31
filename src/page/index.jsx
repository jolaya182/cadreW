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
import React, { Children } from 'react';
import pages from '../css/index.scss';
import MainMenu from './MainMenu';
import WheatherApp from '../components/WheatherApp';

export const Whoops404 = () => (
  <div className="whoops404">
    <h1>
      resources not found at
      {location.pathname}
    </h1>
  </div>
);

const PageTemplate = ({ children }) => (
  <div className="page">
    <MainMenu />
    {children}
  </div>
);

export const Today = () => (
  <PageTemplate>
    <WheatherApp comp="Today" />
  </PageTemplate>
);

export const SevenDays = () => (
  <PageTemplate>
    <WheatherApp comp="SevenDays" />
  </PageTemplate>
);
