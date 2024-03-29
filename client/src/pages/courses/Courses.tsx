import { IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { FC, useEffect } from 'react';
import AddForm from '../../components/courses/add-form';
import CourseCard from '../../components/courses/course-card';
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

  const handleCreateCourse = () => {
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
    courses.map(course => <CourseCard key={course._id} course={course} />)
  );

  return (
    <div className={styles.courses}>
      <SectionTitle title="Courses">
        <IconButton
          aria-label="Add"
          size="small"
          className={styles.btn}
          onClick={handleCreateCourse}
        >
          <Add />
        </IconButton>
      </SectionTitle>
      <Typography variant="subtitle1" component="p"></Typography>
      {body}
    </div>
  );
};

export default Courses;
