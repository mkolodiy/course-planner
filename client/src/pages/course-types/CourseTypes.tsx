import React, { FC, useEffect } from 'react';
import {
  Fab,
  IconButton,
  Paper,
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
import { useCourseTypes } from '../../contexts/course-types-context';
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
  } = useCourseTypes();

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
      title: 'Update Course Type',
      closeButtonText: 'Update',
      formId: 'add-course-type-form',
      content: (
        <AddForm
          onSubmit={(data: CourseTypePayload) => updateCourseType(_id, data)}
          courseType={courseType}
        />
      )
    });
  };

  const handledDeleteCourseType = (courseType: CourseType) => async () => {
    const { _id } = courseType;
    await deleteCourseType(_id);
  };

  const body = loading ? (
    <LoadingSpinner size={100} />
  ) : isEmpty(courseTypes) ? (
    <Typography variant="subtitle1" component="p">
      No course types available
    </Typography>
  ) : (
    <Paper variant="outlined">
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
    </Paper>
  );

  return (
    <div className={styles.courseTypes}>
      <SectionTitle title="Course Types">
        <IconButton
          aria-label="Add"
          size="small"
          className={styles.btn}
          onClick={handleCreateCourseType}
        >
          <Add />
        </IconButton>
      </SectionTitle>
      <Typography variant="subtitle1" component="p"></Typography>
      {body}
    </div>
  );
};

export default CourseTypes;
