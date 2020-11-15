import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import AppProvider from './contexts/app-provider';
import Courses from './pages/courses';
import Signin from './pages/signin';
import Signup from './pages/signup';
import ProtectedRoute from './components/misc/protected-route/ProtectedRoute';

const routes = [
  {
    path: '/signin',
    component: Signin,
    isPrivate: false
  },
  {
    path: '/signup',
    component: Signup,
    isPrivate: false
  },
  {
    path: '/*',
    component: Courses,
    isPrivate: true
  }
];

const App: FC = () => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <AppProvider>
        <Switch>
          {routes.map(route => (
            <ProtectedRoute key={route.path} {...route} />
          ))}
        </Switch>
      </AppProvider>
    </BrowserRouter>
  </>
);

export default App;
