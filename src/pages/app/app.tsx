import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import Home from '../home/home';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CSSReset />
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/" component={Home} exact />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}
