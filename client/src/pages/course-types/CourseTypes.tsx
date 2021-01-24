import React, { FC, useEffect } from 'react';
import {
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons';
import SectionTitle from '../../components/ui/section-title';
import { useDialog } from '../../contexts/dialog-context';
import styles from './CourseTypes.module.scss';
import AddForm from '../../components/course-types/add-form/AddForm';
import { useCourses } from '../../contexts/course-context';
import LoadingSpinner from '../../components/ui/loading-spinner';
import { isEmpty } from '../../helper/checkUtils';
import { CourseTypePayload } from '../../types/payloads';
import { CourseType } from '../../types/models';

const CourseTypes: FC = () => {
  const { openDialog } = useDialog();
  const {
    createCourseType,
    updateCourseType,
    deleteCourseType,
    getCourseTypes,
    courseTypes,
    loading
  } = useCourses();

  useEffect(() => {
    (async () => {
      await getCourseTypes();
    })();
  }, []);

  const handleCreateCourseType = () => {
    openDialog({
      title: 'New Course Type',
      formId: 'add-course-type-form',
      content: <AddForm onSubmit={createCourseType} />
    });
  };

  const handleEditCourseType = (courseType: CourseType) => () => {
    const { _id } = courseType;
    openDialog({
      title: 'New Course Type',
      formId: 'add-course-type-form',
      content: (
        <AddForm
          onSubmit={(data: CourseTypePayload) => updateCourseType(_id, data)}
          courseType={courseType}
        />
      )
    });
  };

  const handledDeleteCourseType = (courseType: CourseType) => () => {
    const { _id } = courseType;
    deleteCourseType(_id);
  };

  const body = loading ? (
    <LoadingSpinner size={100} />
  ) : isEmpty(courseTypes) ? (
    <Typography variant="subtitle1" component="p">
      No courses available
    </Typography>
  ) : (
    <TableContainer>
      <Table aria-label="Course types table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Course duration&nbsp;(weeks)</TableCell>
            <TableCell>Unit duration&nbsp;(hours)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseTypes.map(courseType => (
            <TableRow key={courseType._id}>
              <TableCell>{courseType.name}</TableCell>
              <TableCell>{courseType.courseDuration}</TableCell>
              <TableCell>{courseType.unitDuration}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="Edit"
                  size="small"
                  onClick={handleEditCourseType(courseType)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  size="small"
                  onClick={handledDeleteCourseType(courseType)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
        onClick={handleCreateCourseType}
      >
        <Add />
      </Fab>
    </div>
  );
};

export default CourseTypes;
