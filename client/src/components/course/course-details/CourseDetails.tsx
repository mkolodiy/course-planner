import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid
} from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCourseTypes } from '../../../contexts/course-types-context';
import { useDialog } from '../../../contexts/dialog-context';
import { getUnformattedDate } from '../../../helper/dateUtils';
import { setValidationError } from '../../../helper/errorUtils';
import { Course } from '../../../types/models';
import { CoursePayload } from '../../../types/payloads';
import SectionTitle from '../../ui/section-title';

interface Props {
  onSubmit: (data: CoursePayload) => void;
  course: Course;
}

const CourseDetails: FC<Props> = ({ onSubmit, course }) => {
  const { handleSubmit, errors, control, setError } = useForm();
  const { getCourseTypes, courseTypes } = useCourseTypes();
  const { closeDialog } = useDialog();

  const { name, type, startDate, endDate } = course;
  console.log(courseTypes);

  useEffect(() => {
    (async () => {
      await getCourseTypes();
    })();
  }, []);

  const handleSubmitCb = (data: CoursePayload) => {
    try {
      onSubmit(data);
      closeDialog();
    } catch (err) {
      setValidationError(err, setError);
    }
  };

  return (
    <>
      <SectionTitle title="Description" />
      <form
        noValidate
        onSubmit={handleSubmit(handleSubmitCb)}
        id="add-course-type-form"
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
                defaultValue={type._id}
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
