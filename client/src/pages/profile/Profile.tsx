import React, { FC, useState, useRef, MouseEvent } from 'react';
import { Fab, Grid, TextField } from '@material-ui/core';
import { useUser } from '../../contexts/user-context';
import { Controller, useForm } from 'react-hook-form';
import { Edit, Save } from '@material-ui/icons';
import SectionTitle from '../../components/ui/section-title';
import { User } from '../../types/models';
import { SignUpPayload } from '../../types/payloads';
import styles from './Profile.module.scss';

const Profile: FC = () => {
  const { user } = useUser();
  // TODO: Add correct typing
  const {
    firstName: oldFirstName,
    lastName: oldLastName,
    email: oldEmail
  } = user as User;
  const { handleSubmit, errors, control, setError } = useForm();
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const activateEditMode = (e: MouseEvent) => {
    e.preventDefault();
    setEditModeEnabled(true);
  };

  const onSubmit = (payload: SignUpPayload) => {
    const { firstName, lastName, email, password } = payload;

    if (password === '') {
      delete payload.password;
    }

    setEditModeEnabled(false);
  };

  return (
    <>
      <SectionTitle title="Profile" />
      <form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue={oldFirstName}
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
                  label="First Name"
                  autoComplete="firstName"
                  disabled={!editModeEnabled}
                  error={!!errors?.firstName && !!errors.firstName?.message}
                  helperText={errors?.firstName && errors.firstName?.message}
                  FormHelperTextProps={{ variant: 'standard' }}
                  {...props}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue={oldLastName}
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
                  label="Last Name"
                  autoComplete="lastName"
                  disabled={!editModeEnabled}
                  error={!!errors?.lastName && !!errors.lastName?.message}
                  helperText={errors?.lastName && errors.lastName?.message}
                  FormHelperTextProps={{ variant: 'standard' }}
                  {...props}
                />
              )}
            />
          </Grid>
        </Grid>
        <Controller
          name="email"
          control={control}
          defaultValue={oldEmail}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address format'
            }
          }}
          render={props => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              disabled={!editModeEnabled}
              error={!!errors?.email && !!errors.email?.message}
              helperText={errors?.email && errors.email?.message}
              FormHelperTextProps={{ variant: 'standard' }}
              {...props}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            minLength: {
              value: 10,
              message: 'Password must have at least 10 characters'
            }
          }}
          render={props => (
            <TextField
              className={!editModeEnabled ? styles.passwordField : ''}
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors?.password && !!errors.password?.message}
              helperText={errors?.password && errors.password?.message}
              FormHelperTextProps={{ variant: 'standard' }}
              {...props}
            />
          )}
        />
        {editModeEnabled ? (
          <Fab
            color="primary"
            aria-label="Save"
            type="submit"
            className={styles.fabBtn}
          >
            <Save />
          </Fab>
        ) : (
          <Fab
            color="primary"
            aria-label="Edit"
            onClick={activateEditMode}
            className={styles.fabBtn}
            type="button"
          >
            <Edit />
          </Fab>
        )}
      </form>
    </>
  );
};

export default Profile;
