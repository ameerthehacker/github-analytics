import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import Navbar from '../../components/navbar/navbar';
import Helmet from 'react-helmet';
import Setup from '../setup/setup';
import history from '../../history';
import { Router } from 'react-router-dom';
import HttpProvider from '../../contexts/http/http';
import AuthProvider from '../../contexts/auth/auth';
import PrivateRoute from '../../components/private-route/private-route';
import Error404 from '../error404/error404';

export default function App() {
  return (
    <>
      <Helmet titleTemplate="GitHub Analytics | %s" />
      <Router history={history}>
        <ThemeProvider>
          <ColorModeProvider>
            <CSSReset />
            <HttpProvider>
              <AuthProvider>
                <Navbar />
                <Switch>
                  <Redirect from="/" to="/dashboard" exact />
                  <Route path="/login" component={Login} exact />
                  <PrivateRoute path="/dashboard" component={Dashboard} exact />
                  <Route path="/setup" component={Setup} exact />
                  <Route component={Error404} />
                </Switch>
              </AuthProvider>
            </HttpProvider>
          </ColorModeProvider>
        </ThemeProvider>
      </Router>
    </>
  );
}
