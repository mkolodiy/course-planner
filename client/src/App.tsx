import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import AppProvider from './contexts/app-provider';
import Layout from './pages/layout';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Courses from './pages/courses';
import Profile from './pages/profile';
import ProtectedRoute from './components/misc/protected-route/ProtectedRoute';
import CourseTypes from './pages/course-types';

const routes = [
  {
    path: '/signin',
    component: Signin,
    isPrivate: false,
    exact: true
  },
  {
    path: '/signup',
    component: Signup,
    isPrivate: false,
    exact: true
  },
  {
    path: '/',
    component: Layout,
    isPrivate: true,
    exact: false
  }
];

export const subRoutes = [
  {
    path: '/',
    component: Courses,
    isPrivate: true,
    exact: true
  },
  {
    path: '/profile',
    component: Profile,
    isPrivate: true,
    exact: true
  },
  {
    path: '/coursetypes',
    component: CourseTypes,
    isPrivate: true,
    exact: true
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
