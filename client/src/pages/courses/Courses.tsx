import { Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { FC, useEffect } from 'react';
import AddForm from '../../components/courses/add-form';
import LoadingSpinner from '../../components/ui/loading-spinner';
import SectionTitle from '../../components/ui/section-title';
import { useCourses } from '../../contexts/courses-context';
import { useDialog } from '../../contexts/dialog-context';
import { isEmpty } from '../../helper/checkUtils';
import styles from './Courses.module.scss';

const Courses: FC = () => {
  const { openDialog } = useDialog();
  const { createCourse, getCourses, courses, loading } = useCourses();

  useEffect(() => {
    (async () => {
      await getCourses();
    })();
  }, []);

  const handleCreateCourseType = () => {
    openDialog({
      title: 'New Course Type',
      formId: 'add-course-type-form',
      content: <AddForm onSubmit={createCourse} />
    });
  };

  const body = loading ? (
    <LoadingSpinner size={100} />
  ) : isEmpty(courses) ? (
    <Typography variant="subtitle1" component="p">
      No courses available
    </Typography>
  ) : (
    courses.map(course => <div>{course.name}</div>)
  );

  return (
    <div className={styles.courses}>
      <SectionTitle title="Courses" />
      <Typography variant="subtitle1" component="p"></Typography>
      {body}
      <Fab
        color="primary"
        aria-label="Add"
        className={styles.fabBtn}
        onClick={handleCreateCourseType}
      >
        <Add />
      </Fab>
    </div>
  );
};

export default Courses;
