import { Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { FC } from 'react';
import AddForm from '../../components/courses/add-form';
import SectionTitle from '../../components/ui/section-title';
import { useDialog } from '../../contexts/dialog-context';
import styles from './Courses.module.scss';

const Courses: FC = () => {
  const { openDialog } = useDialog();

  const handleCreateCourseType = () => {
    openDialog({
      title: 'New Course Type',
      formId: 'add-course-type-form',
      content: <AddForm onSubmit={() => {}} />
    });
  };

  return (
    <div className={styles.courses}>
      <SectionTitle title="Course Types" />
      <Typography variant="subtitle1" component="p"></Typography>
      Todo
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
