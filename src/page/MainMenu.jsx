/**
 * title: MainMenu.js
 *
 * date:12/30/2019
 *
 * author: javier olaya
 *
 * description: component that will hold all the ui layout.
 * and navigation,
 * pages
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import pages from '../css/index.scss';

const MainMenu = () => (
  <nav className="mainMenu">
    <NavLink to="/">[Today]</NavLink>
    <NavLink to="/SevenDays">[SevenDays]</NavLink>
  </nav>
);

export default MainMenu;
