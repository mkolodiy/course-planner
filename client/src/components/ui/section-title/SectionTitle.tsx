import React, { FC } from 'react';
import { Divider, Typography } from '@material-ui/core';
import styles from './SectionTitle.module.scss';

interface Props {
  title: string;
}

const SectionTitle: FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.sectionTitle}>
      <div className={styles.content}>
        <Typography component="h1" variant="h4">
          {title}
        </Typography>
        {children}
      </div>
      <Divider />
    </div>
  );
};

export default SectionTitle;
