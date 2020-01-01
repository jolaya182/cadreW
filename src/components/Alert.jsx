/**
 * title: Alert.jsx
 *
 * date: 12/23/2019
 *
 * author: javier olaya
 *
 * description: component that provides alert information about the area
 */
import React from 'react';
import Picture from './Picture';

const Alert = props => {
  const { alerts, showHeadline, showingHeadline } = props;
  return (
    <div className="">
      <div className="Todayrow alert alertHeader" onClick={showHeadline}>
        {`Severity Alert : ${alerts.severity} `}
      </div>
      {showingHeadline && alerts.severity && (
        <div className="Todayrow">{`Headline: ${alerts.alertHeadline} `}</div>
      )}
    </div>
  );
};
export default Alert;
