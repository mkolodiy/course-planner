import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  IconButton
} from '@material-ui/core';
import { Edit, Save } from '@material-ui/icons';
import React, { FC, useEffect, useState, MouseEvent, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCourseTypes } from '../../../contexts/course-types-context';
import { useCourses } from '../../../contexts/courses-context';
import { getUnformattedDate } from '../../../helper/dateUtils';
import { setValidationError } from '../../../helper/errorUtils';
import { Course } from '../../../types/models';
import { CoursePayload } from '../../../types/payloads';
import SectionTitle from '../../ui/section-title';
import styles from './CourseDetails.module.scss';
import { valueChanged } from '../../../helper/checkUtils';

interface Props {
  course: Course;
}

const CourseDetails: FC<Props> = ({ course }) => {
  const { handleSubmit, errors, control, setError } = useForm();
  const { getCourseTypes, courseTypes } = useCourseTypes();
  const { updateCourse } = useCourses();

  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    _id: courseId,
    name,
    type: { _id: typeId },
    startDate,
    endDate
  } = course;

  useEffect(() => {
    (async () => {
      await getCourseTypes();
    })();
  }, []);

  const activateEditMode = (e: MouseEvent) => {
    e.preventDefault();
    setEditModeEnabled(true);
  };

  const handleSubmitForm = (e: MouseEvent) => {
    e.preventDefault();
    formRef?.current?.submit();
  };

  const onSubmit = async (payload: CoursePayload) => {
    const {
      name: newName,
      type: newType,
      startDate: newStartDate,
      endDate: newEndDate
    } = payload;

    if (
      !valueChanged(name, newName) &&
      !valueChanged(typeId, newType) &&
      !valueChanged(startDate, newStartDate) &&
      !valueChanged(endDate, newEndDate)
    ) {
      setEditModeEnabled(false);
      return;
    }

    try {
      await updateCourse(courseId, payload);
      setEditModeEnabled(false);
    } catch (err) {
      setValidationError(err, setError);
    }
  };

  return (
    <>
      <SectionTitle title="Description">
        {editModeEnabled ? (
          <IconButton
            aria-label="Save"
            size="small"
            className={styles.btn}
            form="update-course-form"
            type="submit"
          >
            <Save />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Edit"
            size="small"
            className={styles.btn}
            onClick={activateEditMode}
          >
            <Edit />
          </IconButton>
        )}
      </SectionTitle>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        id="update-course-form"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              defaultValue={name}
              rules={{
                required: 'Name is required'
              }}
              render={props => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoComplete="name"
                  error={!!errors?.name && !!errors.name?.message}
                  helperText={errors?.name && errors.name?.message}
                  FormHelperTextProps={{ variant: 'standard' }}
                  disabled={!editModeEnabled}
                  {...props}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel id="type-select-label">Course Type</InputLabel>
              <Controller
                name="type"
                control={control}
                defaultValue={typeId}
                rules={{
                  required: 'Course type is required'
                }}
                render={props => (
                  <Select
                    fullWidth
                    id="type"
                    labelId="type-select-label"
                    label="Course type"
                    error={!!errors?.type && !!errors.type?.message}
                    disabled={!editModeEnabled}
                    {...props}
                  >
                    {courseTypes.map(courseType => (
                      <MenuItem value={courseType._id} key={courseType._id}>
                        {courseType.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors?.type} variant="standard">
                {errors?.type && errors.type?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="startDate"
              control={control}
              defaultValue={getUnformattedDate(startDate)}
              rules={{
                required: 'Start date is required'
              }}
              render={props => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="date"
                  required
                  fullWidth
                  id="startDate"
                  label="Start date"
                  autoComplete="startDate"
                  error={!!errors?.startDate && !!errors.startDate?.message}
                  helperText={errors?.startDate && errors.startDate?.message}
                  FormHelperTextProps={{ variant: 'standard' }}
                  disabled={!editModeEnabled}
                  {...props}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="endDate"
              control={control}
              defaultValue={getUnformattedDate(endDate)}
              rules={{
                required: 'End date is required'
              }}
              render={props => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="date"
                  required
                  fullWidth
                  id="endDate"
                  label="End date"
                  autoComplete="endDate"
                  error={!!errors?.endDate && !!errors.endDate?.message}
                  helperText={errors?.endDate && errors.endDate?.message}
                  FormHelperTextProps={{ variant: 'standard' }}
                  disabled={!editModeEnabled}
                  {...props}
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CourseDetails;
