import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import AppProvider from './contexts/app-provider';
import Courses from './pages/courses';
import Signin from './pages/signin';
import Signup from './pages/signup';

const App: FC = () => (
  <AppProvider>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/courses">
          <Courses />
        </Route>
        <Redirect from="/*" exact to="/courses" />
      </Switch>
    </BrowserRouter>
  </AppProvider>
);

export default App;
