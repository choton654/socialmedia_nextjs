import {
  Button,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import GavelIcon from '@material-ui/icons/Gavel';
import Axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
function signup({ classes }) {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: null,
    isSubmit: false,
  };

  const [state, setstate] = useState(initialState);

  const { isSubmit } = state;
  useEffect(() => {
    if (isSubmit) {
      signUpUser();
    }
  }, [isSubmit]);

  const signUpUser = async () => {
    console.log(state);
    const userData = {
      name: state.name,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };
    try {
      const res = await Axios.post('/api/v1/auth/signup', userData);

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
          <GavelIcon color='primary' className={classes.lock} />
          <Typography variant='h2' className={classes.pageTitle}>
            SignUp
          </Typography>
          <form onSubmit={handelSubmit} className={classes.form} noValidate>
            <TextField
              id='name'
              label='name'
              type='text'
              name='name'
              helperText={state.error ? state.error.error : null}
              error={state.error ? true : false}
              fullWidth
              value={state.name}
              className={classes.textField}
              onChange={handelChange}
            />
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
            <TextField
              id='confirmPassword'
              label='confirmPassword'
              type='password'
              name='confirmPassword'
              helperText={state.error ? state.error.error : null}
              error={state.error ? true : false}
              fullWidth
              value={state.confirmPassword}
              className={classes.textField}
              onChange={handelChange}
            />
            <Button
              type='submit'
              color='primary'
              variant='contained'
              disabled={state.loading}
              className={classes.button}>
              {state.loading ? <CircularProgress /> : 'Signup'}
            </Button>
            <br />
            <small>
              already have an account? <Link href='/login'>login</Link>
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

export default withStyles(styles)(signup);
