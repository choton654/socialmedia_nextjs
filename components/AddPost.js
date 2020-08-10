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
import React, { useEffect, useState } from 'react';
import { DataState } from '../context/context/dataContext';

function AddPost({ classes }) {
  const [state, setstate] = useState({
    title: '',
    open: false,
    isSubmit: false,
  });

  const { addPost } = DataState();
  const {
    state: { loading, error },
  } = DataState();

  const handleOpen = () => {
    setstate({
      ...state,
      open: true,
    });
  };
  const handleClose = () => {
    setstate({ ...state, open: false, isSubmit: false });
  };

  const handleChange = (event) => {
    setstate({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const { isSubmit } = state;
  useEffect(() => {
    if (isSubmit) {
      addPost({ title: state.title });
      handleClose();
    }
  }, [isSubmit]);
  const handleSubmit = () => {
    setstate({ ...state, isSubmit: true });
  };

  return (
    <div>
      <Button
        color='inherit'
        className={classes.icon}
        onClick={() => handleOpen()}>
        Create
      </Button>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
        {loading && <CircularProgress color='secondary' />}
        {/* {error && <p>{error.msg}</p>} */}
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='title'
              tpye='text'
              label='Add Post'
              multiline
              rows='3'
              helperText={error ? error.msg : null}
              error={error ? true : false}
              placeholder='Add Post'
              className={classes.textField}
              value={state.title}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
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
