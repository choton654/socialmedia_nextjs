import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { DataState } from '../context/context/dataContext';

function DeletePost({ id }) {
  const [state, setstate] = useState({
    open: false,
  });

  const { deletePost } = DataState();

  const handleOpen = () => {
    setstate({
      ...state,
      open: true,
    });
  };
  const handleClose = () => {
    setstate({ ...state, open: false });
  };

  return (
    <div>
      <DeleteIcon
        onClick={handleOpen}
        color='error'
        style={{
          cursor: 'pointer',
        }}
      />
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Do You Want To Delete</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              deletePost(id);
              handleClose();
            }}
            color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeletePost;
