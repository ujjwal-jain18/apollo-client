import React from 'react';
import { Mutation } from '@apollo/react-components';
import LOGIN_USER from './mutation';
import Login from './login';

export default () => (
    <Mutation mutation={LOGIN_USER}>
      {(loginUser) => (
          <Login loginUser={loginUser} />
      )}
    </Mutation>
);
