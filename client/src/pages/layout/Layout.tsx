import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { subRoutes } from '../../App';
import Footer from '../../components/layout/footer';
import Header from '../../components/layout/header';
import ProtectedRoute from '../../components/misc/protected-route/ProtectedRoute';
import styles from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Switch>
          {subRoutes.map(route => (
            <ProtectedRoute key={route.path} {...route} />
          ))}
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
