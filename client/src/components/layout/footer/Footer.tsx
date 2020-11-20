import React, { FC } from 'react';
import { Link, Paper, Typography } from '@material-ui/core';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer>
      <Paper elevation={0} className={styles.paper}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </Paper>
    </footer>
  );
};

export default Footer;
