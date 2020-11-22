import React, { FC } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import styles from './LoadingSpinner.module.scss';

interface Props {
  size?: string | number;
}

const LoadingSpinner: FC<Props> = ({ size }) => {
  return (
    <div className={styles.loadingSpinner}>
      <CircularProgress size={size} />
      <Typography component="div" variant="h5" className={styles.text}>
        Loading...
      </Typography>
    </div>
  );
};

export default LoadingSpinner;
