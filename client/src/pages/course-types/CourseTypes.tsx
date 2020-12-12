import React, { FC } from 'react';
import { DialogTitle, Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import SectionTitle from '../../components/ui/section-title';
import { useDialog } from '../../contexts/dialog-context';
import styles from './CourseTypes.module.scss';

const TestComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref}>Test</div>
));

const CourseTypes: FC = () => {
  const { openDialog } = useDialog();

  const handleOpenDialog = () => {
    openDialog({
      content: <TestComponent />
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
