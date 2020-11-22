import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { subRoutes } from '../../App';
import Footer from '../../components/layout/footer';
import Header from '../../components/layout/header';
import Main from '../../components/layout/main';
import ProtectedRoute from '../../components/misc/protected-route/ProtectedRoute';
import styles from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Main>
        <Switch>
          {subRoutes.map(route => (
            <ProtectedRoute key={route.path} {...route} />
          ))}
        </Switch>
      </Main>
      <Footer />
    </div>
  );
};

export default Layout;
