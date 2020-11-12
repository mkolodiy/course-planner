import React, { FC, FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../contexts/auth-context/authContext';
import { SignInPayload } from '../../types/payloads';
import { setValidationError } from '../../helper/errorUtils';
import styles from './SignIn.module.scss';

const Signin: FC = () => {
  const { signIn, loading, error } = useAuth();
  const { handleSubmit, errors, control, setError } = useForm();
  const history = useHistory();

  const onSubmit = async (data: SignInPayload) => {
    try {
      await signIn(data);
      history.push('/courses');
    } catch (err) {
      setValidationError(err, setError);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={styles.signin}>
        <Avatar className={styles.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={styles.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
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
                autoFocus
                disabled={loading}
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
              required: 'Password is required'
            }}
            render={props => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={loading}
                error={!!errors?.password && !!errors.password?.message}
                helperText={errors?.password && errors.password?.message}
                FormHelperTextProps={{ variant: 'standard' }}
                {...props}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.button}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>

        <Link to="/signup" className={styles.link}>
          Don't have an account? Sign Up
        </Link>
      </div>
    </Container>
  );
};

export default Signin;
