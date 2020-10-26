import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Courses from './pages/courses';
import Signin from './pages/signin';
import Signup from './pages/signup';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/singin">
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
);

export default App;
