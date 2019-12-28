/**
 * title: WheatherApp.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component to hold all forms and day forecast
 */
import React from 'react';
import WheatherForm from './WheatherForm';
import Today from './Today';
import SevenDayForecast from './SevenDayForecast';

const WheatherApp = () => {
  return (
    <div>
      WheatherApp
      <WheatherForm />
      <Today />
      {/* <SevenDayForecast /> */}
    </div>
  );
};
export default WheatherApp;
