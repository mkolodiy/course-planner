import React, { FC, useEffect } from 'react';
import { Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import SectionTitle from '../../components/ui/section-title';
import { useDialog } from '../../contexts/dialog-context';
import styles from './CourseTypes.module.scss';
import AddForm from '../../components/course-types/add-form/AddForm';
import { useCourses } from '../../contexts/course-context';
import LoadingSpinner from '../../components/ui/loading-spinner';
import { isEmpty } from '../../helper/checkUtils';

const CourseTypes: FC = () => {
  const { openDialog } = useDialog();
  const { getCourseTypes, courseTypes, loading } = useCourses();

  useEffect(() => {
    (async () => {
      await getCourseTypes();
    })();
  }, []);

  const handleOpenDialog = () => {
    openDialog({
      title: 'New Course Type',
      formId: 'add-course-type-form',
      content: <AddForm />
    });
  };

  const body = loading ? (
    <LoadingSpinner size={100} />
  ) : isEmpty(courseTypes) ? (
    <Typography variant="subtitle1" component="p">
      No courses available
    </Typography>
  ) : (
    courseTypes.map(courseType => <div>{courseType.name}</div>)
  );

  return (
    <div className={styles.courseTypes}>
      <SectionTitle title="Course Types" />
      <Typography variant="subtitle1" component="p"></Typography>
      {body}
      <Fab
        color="primary"
        aria-label="Add"
        className={styles.fabBtn}
        onClick={handleOpenDialog}
      >
        <Add />
      </Fab>
    </div>
  );
};

export default CourseTypes;
