import { Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { FC } from 'react';
import FormDialog from '../../components/ui/dialog';
import SectionTitle from '../../components/ui/section-title';
import styles from './CourseTypes.module.scss';

const CourseTypes: FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className={styles.courseTypes}>
      <SectionTitle title="Course Types" />
      <Typography variant="subtitle1" component="p">
        No courses available
      </Typography>
      <FormDialog
        onSave={() => {}}
        onClose={handleCloseDialog}
        open={open}
        title="New course type"
      />
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
