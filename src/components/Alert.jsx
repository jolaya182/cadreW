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
import PropTypes from 'prop-types';
/**
 *
 *
 * @param {*} props
 * @returns Jsx component
 */
const Alert = props => {
  const { alerts, showHeadline, showingHeadline } = props;
  return (
    <div className="">
      <div
        className="Todayrow alert alertHeader"
        onClick={showHeadline}
        role="button"
        tabIndex="0"
      >
        {`Severity Alert : ${alerts.severity} `}
      </div>
      {showingHeadline && alerts.severity && (
        <div className="Todayrow">{`Headline: ${alerts.alertHeadline} `}</div>
      )}
    </div>
  );
};
export default Alert;

Alert.propTypes = {
  alerts: PropTypes.objectOf(PropTypes.string),
  showHeadline: PropTypes.func,
  showingHeadline: PropTypes.bool
};

Alert.defaultProps = {
  alerts: null,
  showHeadline: null,
  showingHeadline: null
};
