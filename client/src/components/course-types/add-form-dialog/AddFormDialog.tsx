import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import React, { FC, Ref } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CourseTypePayload } from '../../../types/payloads';

interface Props {
  ref?: Ref<HTMLFormElement>;
  onSubmit: (payload: CourseTypePayload) => void;
}

const AddFormDialog: FC<Props> = ({ ref, onSubmit }) => {
  const { handleSubmit, errors, control } = useForm();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} ref={ref}>
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
      <Controller
        name="courseDuration"
        control={control}
        defaultValue=""
        rules={{
          required: 'Course duration is required'
        }}
        render={props => (
          <FormControl fullWidth variant="outlined" margin="normal" {...props}>
            <InputLabel id="courseDuration-select-label">
              Course Duration
            </InputLabel>
            <Select
              value=""
              required
              fullWidth
              id="courseDuration"
              labelId="courseDuration-select-label"
              label="Course Duration"
            >
              <MenuItem value={1}>1 week</MenuItem>
              <MenuItem value={2}>2 weeks</MenuItem>
              <MenuItem value={3}>3 weeks</MenuItem>
              <MenuItem value={4}>4 weeks</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="unitDuration"
        control={control}
        defaultValue=""
        rules={{
          required: 'Unit duration is required'
        }}
        render={props => (
          <FormControl fullWidth variant="outlined" margin="normal" {...props}>
            <InputLabel id="unitDuration-select-label">
              Unit Duration
            </InputLabel>
            <Select
              value=""
              required
              fullWidth
              id="unitDuration"
              labelId="unitDuration-select-label"
              label="Unit Duration"
            >
              <MenuItem value={1}>1 hour</MenuItem>
              <MenuItem value={2}>2 hours</MenuItem>
              <MenuItem value={3}>3 hours</MenuItem>
              <MenuItem value={4}>4 hours</MenuItem>
              <MenuItem value={5}>5 hours</MenuItem>
              <MenuItem value={6}>6 hours</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </form>
  );
};

export default AddFormDialog;
