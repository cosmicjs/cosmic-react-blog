import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppContainer = ({ children }) => (
  <div>
    {children}
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


export { AppContainer as DisconnectedAppContainer };

export default connect()(AppContainer);
