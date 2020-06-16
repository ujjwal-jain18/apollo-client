/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../component/index';

const PrivateLayout = ({ children, ...rest }) => (
  <div>
    <Navbar />
    &nbsp;
    <div>{children}</div>
  </div>
);
PrivateLayout.propTypes = {
  children: PropTypes.object.isRequired,
};
export default PrivateLayout;
