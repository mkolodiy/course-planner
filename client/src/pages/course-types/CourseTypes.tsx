import React, { FC, useRef } from 'react';
import { Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import SectionTitle from '../../components/ui/section-title';
import { useDialog } from '../../contexts/dialog-context';
import styles from './CourseTypes.module.scss';
import AddFormDialog from '../../components/course-types/add-form-dialog/AddFormDialog';
import { CourseTypePayload } from '../../types/payloads';

const CourseTypes: FC = () => {
  const { openDialog } = useDialog();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (payload: CourseTypePayload) => {
    console.log(payload);
  };

  const handleOpenDialog = () => {
    openDialog({
      onClose: () => console.log('onClose'),
      onSave: () => console.log('onSave'),
      title: 'New Course Type',
      content: <AddFormDialog onSubmit={onSubmit} />
    });
  };

  return (
    <div className={styles.courseTypes}>
      <SectionTitle title="Course Types" />
      <Typography variant="subtitle1" component="p">
        No courses available
      </Typography>
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
