import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import SectionTitle from '../../components/ui/section-title';

const Courses: FC = () => {
  return (
    <>
      <SectionTitle title="Courses" />
      <Typography variant="subtitle1" component="p">
        No courses available
      </Typography>
    </>
  );
};

export default Courses;
