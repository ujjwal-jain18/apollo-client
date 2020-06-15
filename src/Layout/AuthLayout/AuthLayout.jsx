/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../component/index';

const AuthLayout = ({ children, ...rest }) => (
  <div>
    <div>{children}</div>
    &nbsp; &nbsp;
    <Footer />
  </div>
);
AuthLayout.propTypes = {
  children: PropTypes.object.isRequired,
};
export default AuthLayout;
