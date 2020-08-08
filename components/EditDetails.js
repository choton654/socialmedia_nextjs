import { IconButton, Tooltip, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
function EditDetails({ user, classes, editUserDetails }) {
  const [state, setstate] = useState({
    bio: '',
    location: '',
    website: '',
    open: false,
  });

  const handleOpen = () => {
    const { credential } = user;
    setstate({
      ...state,
      bio: credential.bio ? credential.bio : '',
      website: credential.website ? credential.website : '',
      location: credential.location ? credential.location : '',
      open: true,
    });
  };
  const handleClose = () => {
    setstate({ ...state, open: false });
  };
  useEffect(() => {
    const { credential } = user;
    setstate({
      ...state,
      bio: credential.bio ? credential.bio : '',
      website: credential.website ? credential.website : '',
      location: credential.location ? credential.location : '',
    });
  }, []);

  const handleChange = (event) => {
    setstate({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location,
    };
    editUserDetails(userDetails);
    handleClose();
  };

  return (
    <>
      <Tooltip title='Edit Details' placeholder='top'>
        <IconButton onClick={handleOpen}>
          <EditIcon color='primary' />
        </IconButton>
      </Tooltip>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              tpye='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='website'
              tpye='text'
              label='Website'
              placeholder='Your personal/professinal website'
              className={classes.textField}
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='location'
              tpye='text'
              label='Location'
              placeholder='Where you live'
              className={classes.textField}
              value={state.location}
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
    </>
  );
}

const styles = (theme) => ({
  textField: {
    margin: '10px auto 10 auto',
  },
  button: {
    marginTop: 20,
  },
});

export default withStyles(styles)(EditDetails);
