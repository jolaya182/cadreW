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

const selectedStyle = {
  backgroundColor: 'white',
  color: 'slateGray'
};
const MainMenu = () => (
  <nav className="mainMenu">
    <NavLink className="column" activeStyle={selectedStyle} to="/Today">
      [Today]
    </NavLink>
    <NavLink className="column" activeStyle={selectedStyle} to="/SevenDays">
      [SevenDays]
    </NavLink>
  </nav>
);

export default MainMenu;
