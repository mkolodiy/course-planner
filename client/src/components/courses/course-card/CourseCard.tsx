import { Divider, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { formatDate } from '../../../helper/dateUtils';
import { Course } from '../../../types/models';
import styles from './CourseCard.module.scss';

interface Props {
  course: Course;
}

const CourseCard: FC<Props> = ({ course }) => {
  console.log(course);

  return (
    <Paper variant="outlined" className={styles.courseCard}>
      <div>
        <Typography variant="h5" gutterBottom>
          {course.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {course.type.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          from {formatDate(course.startDate)} to {formatDate(course.endDate)}
        </Typography>
      </div>

      <div>
        <Divider orientation="vertical" flexItem />
        <Typography variant="h5" gutterBottom>
          {course.participants.length} participants
        </Typography>
      </div>
    </Paper>
  );
};

export default CourseCard;
