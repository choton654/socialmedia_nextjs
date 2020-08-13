import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { DataState } from '../context/context/dataContext';

function AddPost({ classes }) {
  const [state, setstate] = useState({
    title: '',
    open: false,
    error: null,
  });

  const { addPost } = DataState();
  const {
    clearErrors,
    state: { loading, error },
  } = DataState();

  const handleOpen = () => {
    setstate({
      ...state,
      open: true,
    });
  };
  const handleClose = () => {
    clearErrors();
    setstate({
      ...state,
      open: false,
      title: '',
      error: null,
    });
  };

  const handleChange = (event) => {
    setstate({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (error) {
      setstate({ ...state, error: error });
    }
    if (!error && !loading) {
      setstate({ ...state, title: '' });
      handleClose();
    }
  }, [error, loading]);

  const handleSubmit = () => {
    addPost({ title: state.title });
  };

  return (
    <div>
      <Button
        color='inherit'
        className={classes.icon}
        onClick={() => handleOpen()}>
        <AddIcon />
      </Button>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='title'
              tpye='text'
              label='Add Post'
              multiline
              rows='3'
              helperText={state.error ? state.error.msg : null}
              error={state.error ? true : false}
              placeholder='Title'
              className={classes.textField}
              value={state.title}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress color='secondary' />
          ) : (
            <>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleSubmit} color='primary'>
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
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
  icon: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#fff',
    marginRight: theme.spacing(1),
  },
});

export default withStyles(styles)(AddPost);
