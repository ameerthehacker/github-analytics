import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import Home from '../home/home';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import Navbar from '../../components/navbar/navbar';
import { SWRConfig } from 'swr';

export default function App() {
  return (
    <SWRConfig 
      value={{
        refreshInterval: 3000,
        fetcher: (...args) => fetch(args).then(res => res.json())
      }}
    >
      <BrowserRouter>
        <ThemeProvider>
          <CSSReset />
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/" component={Home} exact />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </SWRConfig>
  );
}
