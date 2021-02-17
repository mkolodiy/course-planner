import { TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDialog } from '../../../../contexts/dialog-context';
import { setValidationError } from '../../../../helper/errorUtils';
import { Participant } from '../../../../types/models';
import { ParticipantPayload } from '../../../../types/payloads';

interface Props {
  onSubmit: (data: ParticipantPayload) => void;
  participant?: Participant;
}

const AddForm: FC<Props> = ({ onSubmit, participant }) => {
  const { handleSubmit, errors, control, setError } = useForm();

  const { closeDialog } = useDialog();

  const handleSubmitCb = async (data: ParticipantPayload) => {
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
      id="add-participant-form"
    >
      <Controller
        name="firstName"
        control={control}
        defaultValue={participant?.firstName || ''}
        rules={{
          required: 'First name is required'
        }}
        render={props => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First name"
            autoComplete="firstName"
            error={!!errors?.firstName && !!errors.firstName?.message}
            helperText={errors?.firstName && errors.firstName?.message}
            FormHelperTextProps={{ variant: 'standard' }}
            {...props}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue={participant?.lastName || ''}
        rules={{
          required: 'Last name is required'
        }}
        render={props => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last name"
            autoComplete="lastName"
            error={!!errors?.lastName && !!errors.lastName?.message}
            helperText={errors?.lastName && errors.lastName?.message}
            FormHelperTextProps={{ variant: 'standard' }}
            {...props}
          />
        )}
      />
    </form>
  );
};

export default AddForm;
