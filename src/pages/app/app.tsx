import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import Home from '../home/home';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import Navbar from '../../components/navbar/navbar';

export default function App() {
  return (
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
  );
}
