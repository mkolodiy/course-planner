// @ts-nocheck

import React, { FC, FormEvent, useState } from 'react';
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.scss';
import useAuth from '../../hooks/useAuth';

const Signin: FC = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeEmail = (e: any) => setEmail(e.target.value);

  const handleOnChangePassword = (e: any) => setPassword(e.target.value);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('onSubmit', email);
    console.log('onSubmit', password);
    signIn({
      email,
      password
    });
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
        <form className={styles.form} noValidate onSubmit={handleOnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleOnChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleOnChangePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.button}
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
