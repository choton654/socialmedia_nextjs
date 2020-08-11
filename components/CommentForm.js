import { Button, Grid, TextField, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DataState } from '../context/context/dataContext';
import { UserState } from '../context/context/userContext';

function CommentForm({ id: postId, classes }) {
  const [state, setstate] = useState({
    text: '',
    error: null,
  });

  const {
    state: { authenticated },
  } = UserState();

  const {
    addCommentToPost,
    state: { error, loading },
  } = DataState();

  useEffect(() => {
    if (error) {
      setstate({ ...state, error: error });
    }
    if (!error && !loading) {
      setstate({ ...state, text: '', error: null });
    }
  }, [error, loading]);

  const handleSubmit = (e) => {
    addCommentToPost(postId, { text: state.text });
  };

  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name='text'
              type='text'
              label='Comment on post'
              error={state.error ? true : false}
              helperText={state.error ? state.error.msg : null}
              value={state.text}
              onChange={handleChange}
              fullWidth
              className={classes.textField}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}>
              Submit
            </Button>
          </form>
        </Grid>
      ) : null}
    </div>
  );
}

const styles = (theme) => ({
  textField: {
    margin: '10px auto 10 auto',
  },
  button: {
    marginTop: 20,
    margin: 'auto',
  },
});

export default withStyles(styles)(CommentForm);
