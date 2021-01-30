import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText
} from '@material-ui/core';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDialog } from '../../../contexts/dialog-context';
import { setValidationError } from '../../../helper/errorUtils';
import { CourseType } from '../../../types/models';
import { CourseTypePayload } from '../../../types/payloads';

interface Props {
  onSubmit: (data: CourseTypePayload) => void;
  courseType?: CourseType;
}

const AddForm: FC<Props> = ({ onSubmit, courseType }) => {
  const { handleSubmit, errors, control, setError } = useForm();

  const { closeDialog } = useDialog();

  const handleSubmitCb = async (data: CourseTypePayload) => {
    try {
      await onSubmit(data);
      closeDialog();
    } catch (err) {
      setValidationError(err, setError);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleSubmitCb)}
      id="add-course-type-form"
    >
      <Controller
        name="name"
        control={control}
        defaultValue={courseType?.name || ''}
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
      <FormControl fullWidth variant="outlined" margin="normal" required>
        <InputLabel id="courseDuration-select-label">
          Course Duration
        </InputLabel>
        <Controller
          name="courseDuration"
          control={control}
          defaultValue={courseType?.courseDuration || ''}
          rules={{
            required: 'Course duration is required'
          }}
          render={props => (
            <Select
              fullWidth
              id="courseDuration"
              labelId="courseDuration-select-label"
              label="Course Duration"
              error={
                !!errors?.courseDuration && !!errors.courseDuration?.message
              }
              {...props}
            >
              <MenuItem value={1}>1 week</MenuItem>
              <MenuItem value={2}>2 weeks</MenuItem>
              <MenuItem value={3}>3 weeks</MenuItem>
              <MenuItem value={4}>4 weeks</MenuItem>
            </Select>
          )}
        />
        <FormHelperText error={!!errors?.courseDuration} variant="standard">
          {errors?.courseDuration && errors.courseDuration?.message}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="unitDuration-select-label">Unit Duration</InputLabel>
        <Controller
          name="unitDuration"
          control={control}
          defaultValue={courseType?.courseDuration || ''}
          rules={{
            required: 'Unit duration is required'
          }}
          render={props => (
            <Select
              required
              fullWidth
              id="unitDuration"
              labelId="unitDuration-select-label"
              label="Unit Duration"
              error={!!errors?.unitDuration && !!errors.unitDuration?.message}
              {...props}
            >
              <MenuItem value={1}>1 hour</MenuItem>
              <MenuItem value={2}>2 hours</MenuItem>
              <MenuItem value={3}>3 hours</MenuItem>
              <MenuItem value={4}>4 hours</MenuItem>
              <MenuItem value={5}>5 hours</MenuItem>
              <MenuItem value={6}>6 hours</MenuItem>
            </Select>
          )}
        />
        <FormHelperText error={!!errors?.unitDuration} variant="standard">
          {errors?.unitDuration && errors.unitDuration?.message}
        </FormHelperText>
      </FormControl>
    </form>
  );
};

export default AddForm;
