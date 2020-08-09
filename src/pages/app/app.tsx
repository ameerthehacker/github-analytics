import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import Navbar from '../../components/navbar/navbar';
import { SWRConfig } from 'swr';
import Helmet from 'react-helmet';
import Setup from '../setup/setup';

export default function App() {
  return (
    <SWRConfig 
      value={{
        refreshInterval: 3000,
        fetcher: (...args) => fetch(args).then(res => res.json())
      }}
    >
      <Helmet titleTemplate="GitHub Analytics | %s" />
      <BrowserRouter>
        <ThemeProvider>
          <ColorModeProvider>
            <CSSReset />
            <Navbar />
            <Switch>
              <Redirect from="/" to="/dashboard" exact />
              <Route path="/login" component={Login} exact />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/setup" component={Setup} exact />
            </Switch>
          </ColorModeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </SWRConfig>
  );
}
