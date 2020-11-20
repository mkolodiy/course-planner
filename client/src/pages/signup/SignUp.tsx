import {
  Container,
  Avatar,
  Typography,
  Button,
  TextField,
  Grid
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../components/layout/footer';
import { useAuth } from '../../contexts/auth-context';
import { setValidationError } from '../../helper/errorUtils';
import { SignUpPayload } from '../../types/payloads';
import styles from './SignUp.module.scss';

const Signup: FC = () => {
  const { signUp, loading } = useAuth();
  const { handleSubmit, errors, control, setError } = useForm();
  const history = useHistory();

  const onSubmit = async (data: SignUpPayload) => {
    try {
      await signUp(data);
      history.push('/courses');
    } catch (err) {
      setValidationError(err, setError);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={styles.signup}>
          <Avatar className={styles.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={styles.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
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
                      disabled={loading}
                      error={!!errors?.firstName && !!errors.firstName?.message}
                      helperText={
                        errors?.firstName && errors.firstName?.message
                      }
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
                  defaultValue=""
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
                      disabled={loading}
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
                required: 'Password is required',
                minLength: {
                  value: 10,
                  message: 'Password must have at least 10 characters'
                }
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
              Sign up
            </Button>
          </form>

          <Link to="/signin" className={styles.link}>
            Already have an account? Sign In
          </Link>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Signup;
