import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import styles from './Main.module.scss';

const Main: FC = ({ children }) => {
  return (
    <Container component="main" fixed className={styles.main}>
      <>{children}</>
    </Container>
  );
};

export default Main;
