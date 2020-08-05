import {
  Button,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import Lock from '@material-ui/icons/Lock';
import Axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
function login({ classes }) {
  const initialState = {
    email: '',
    password: '',
    loading: false,
    error: null,
    isSubmit: false,
  };

  const [state, setstate] = useState(initialState);

  const { isSubmit } = state;
  useEffect(() => {
    if (isSubmit) {
      logInUser();
    }
  }, [isSubmit]);

  const logInUser = async () => {
    console.log(state);
    const userData = {
      email: state.email,
      password: state.password,
    };
    try {
      const res = await Axios.post('/api/v1/auth/login', userData);

      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      setstate({
        ...state,
        loading: false,
        isSubmit: false,
      });
      router.push('/');
    } catch (error) {
      setstate({
        ...state,
        error: error.response.data,
        loading: false,
        isSubmit: false,
      });
      console.error(error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setstate({
      ...state,
      loading: true,
      isSubmit: true,
    });
  };

  const handelChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className={classes.root}>
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Lock color='secondary' className={classes.lock} />
          <Typography variant='h2' className={classes.pageTitle}>
            LogIn
          </Typography>
          <form onSubmit={handelSubmit} className={classes.form} noValidate>
            <TextField
              id='email'
              label='email'
              type='email'
              name='email'
              helperText={state.error ? state.error.error : null}
              error={state.error ? true : false}
              fullWidth
              value={state.email}
              className={classes.textField}
              onChange={handelChange}
            />
            <TextField
              id='password'
              label='password'
              type='password'
              name='password'
              helperText={state.error ? state.error.error : null}
              error={state.error ? true : false}
              fullWidth
              value={state.password}
              className={classes.textField}
              onChange={handelChange}
            />
            <Button
              type='submit'
              color='primary'
              variant='contained'
              disabled={state.loading}
              className={classes.button}>
              {state.loading ? <CircularProgress /> : 'Login'}
            </Button>
            <br />
            <small>
              don't have an account? <Link href='/signup'>signup</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </main>
  );
}

const styles = (theme) => ({
  root: {
    maxWidth: '1200px',
    margin: '80px auto 0 auto',
  },
  form: {
    textAlign: 'center',
  },
  lock: {
    width: '50px',
    margin: '20px auto 0 auto',
  },
  pageTitle: {
    margin: '10px auto 10 auto',
  },
  textField: {
    margin: '10px auto 10 auto',
  },
  button: {
    marginTop: 20,
  },
});

export default withStyles(styles)(login);
