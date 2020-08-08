import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import Home from '../home/home';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import Navbar from '../../components/navbar/navbar';
import { SWRConfig } from 'swr';
import Helmet from 'react-helmet';

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
              <Route path="/login" component={Login} exact />
              <Route path="/" component={Home} exact />
            </Switch>
          </ColorModeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </SWRConfig>
  );
}
