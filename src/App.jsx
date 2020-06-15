/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { SnackbarProvider } from './contexts/index';
import {
  Demo,
  InputDemo,
  ChildrenDemo,
  Trainee,
  WrapLogin,
  NotFound,
} from './pages/index';
import { ApolloProvider } from '@apollo/react-components' ;
import apolloClient from './libs/apollo-client';
import { AuthRoute, PrivateRoute } from './routes/index';

function App() {
  return (
    <SnackbarProvider>
      <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          {localStorage.getItem('token') ? (
            <Route exact path='/'>
              <Redirect to='/trainee' />
            </Route>
          ) : (
            <Route exact path='/'>
              <Redirect to='/login' />
            </Route>
          )}
          <AuthRoute exact path='/login' component={WrapLogin} />
          <PrivateRoute path='/trainee' component={Trainee} />
          <PrivateRoute exact path='/textfield-demo' component={Demo} />
          <PrivateRoute exact path='/input-demo' component={InputDemo} />
          <PrivateRoute exact path='/children-demo' component={ChildrenDemo} />
          <PrivateRoute exact component={NotFound} />
        </Switch>
      </Router>
      </ApolloProvider>
    </SnackbarProvider>
  );
}

export default App;
