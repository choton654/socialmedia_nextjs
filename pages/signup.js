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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';
function signup({ classes }) {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      name: state.name,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };
    if (isSubmit) {
      dispatch(signUpUser(userData));
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
              disabled={loading}
              className={classes.button}>
              {loading ? <CircularProgress /> : 'Signup'}
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
