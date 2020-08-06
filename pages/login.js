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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from '../redux/actions/userActions';

function login({ classes }) {
  const initialState = {
    email: '',
    password: '',
    error: null,
    isSubmit: false,
  };

  const [state, setstate] = useState(initialState);

  const dispatch = useDispatch();

  const store = useSelector((state) => {
    return {
      user: state.user,
      UI: state.UI,
    };
  });

  const { loading, error } = store.UI;

  const { isSubmit } = state;
  useEffect(() => {
    const userData = {
      email: state.email,
      password: state.password,
    };
    if (isSubmit) {
      dispatch(logInUser(userData));
      setstate({
        ...state,
        isSubmit: false,
      });
    }
    if (error) {
      setstate({
        ...state,
        error: error,
        isSubmit: false,
      });
    }
  }, [isSubmit, error]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setstate({
      ...state,
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
              disabled={loading}
              className={classes.button}>
              {loading ? <CircularProgress /> : 'Login'}
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
