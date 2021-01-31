import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText
} from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCourseTypes } from '../../../contexts/course-types-context';
import { useDialog } from '../../../contexts/dialog-context';
import { setValidationError } from '../../../helper/errorUtils';
import { CoursePayload } from '../../../types/payloads';

interface Props {
  onSubmit: (data: CoursePayload) => void;
}

const AddForm: FC<Props> = ({ onSubmit }) => {
  const { handleSubmit, errors, control, setError } = useForm();
  const { getCourseTypes, courseTypes } = useCourseTypes();
  const { closeDialog } = useDialog();

  useEffect(() => {
    (async () => {
      await getCourseTypes();
    })();
  }, []);

  const handleSubmitCb = async (data: CoursePayload) => {
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
        defaultValue=""
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
        <InputLabel id="type-select-label">Course Type</InputLabel>
        <Controller
          name="type"
          control={control}
          defaultValue=""
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
      <Controller
        name="startDate"
        control={control}
        defaultValue="2021-01-01"
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
      <Controller
        name="endDate"
        control={control}
        defaultValue="2021-01-01"
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
    </form>
  );
};

export default AddForm;
